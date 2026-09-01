#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";

const DEFAULT_ROOT = path.resolve("wiremock");
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const roots = args.filter((arg) => arg !== "--dry-run");
const targetRoots = roots.length > 0 ? roots.map((arg) => path.resolve(arg)) : [DEFAULT_ROOT];

const FIRST_NAMES = [
    "Alex",
    "Avery",
    "Casey",
    "Jordan",
    "Morgan",
    "Parker",
    "Riley",
    "Taylor",
];

const LAST_NAMES = [
    "Brown",
    "Carter",
    "Evans",
    "Hughes",
    "Patel",
    "Reed",
    "Smith",
    "Walker",
];

const STREETS = [
    "Example Road",
    "Sample Street",
    "Demo Avenue",
    "Mock Lane",
];

const CITIES = [
    "London",
    "Birmingham",
    "Leeds",
    "Manchester",
    "Bristol",
    "Liverpool",
];

const POSTCODES = [
    "SW1A 1AA",
    "B1 1AA",
    "LS1 1AA",
    "M1 1AA",
    "BS1 1AA",
    "L1 1AA",
];

const cache = {
    firstName: new Map(),
    lastName: new Map(),
    fullName: new Map(),
    address: new Map(),
    city: new Map(),
    postcode: new Map(),
    email: new Map(),
    phone: new Map(),
    dob: new Map(),
    identifier: new Map(),
};

const personalKeyMatchers = [
    [/^(first|given)name$/, "firstName"],
    [/^(last|family|surname)$/, "lastName"],
    [/firstname$/, "firstName"],
    [/lastname$/, "lastName"],
    [/middlename$/, "firstName"],
    [/dob$/, "dob"],
    [/dateofbirth$/, "dob"],
    [/birthdate$/, "dob"],
    [/postcode$/, "postcode"],
    [/^post_code$/, "postcode"],
    [/email$/, "email"],
    [/(^|)(mobile|phone|telephone|tel)(|number)$/, "phone"],
    [/address\d*$/, "address"],
    [/addressline\d*$/, "address"],
    [/street$/, "address"],
    [/city$/, "city"],
    [/town$/, "city"],
    [/defendantasn$/, "identifier"],
    [/nationalinsurancenumber$/, "identifier"],
    [/nino$/, "identifier"],
    [/passport(number)?$/, "identifier"],
    [/drivinglicence(number)?$/, "identifier"],
    [/subjectname$/, "fullName"],
];

const freeTextScrubbers = [
    [/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, "person@example.com"],
    [/\b(?:\+44\s?|0)7\d{3}\s?\d{6}\b/g, "07123 456789"],
    [/\b\d{2}\s?[A-Z]{1,2}\s?\d[A-Z\d]?\s?\d[A-Z]{2}\b/gi, "SW1A 1AA"],
];

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const GENERIC_ID_RE = /(?:id|uuid)$/i;

let changedFiles = 0;

for (const root of targetRoots) {
    for (const file of collectJsonFiles(root)) {
        const original = fs.readFileSync(file, "utf8");
        const parsed = JSON.parse(original);
        const [anonymised, changed] = anonymiseValue(parsed, []);

        if (changed) {
            changedFiles += 1;
            if (!dryRun) {
                const output = JSON.stringify(anonymised, null, 2) + "\n";
                fs.writeFileSync(file, output, "utf8");
            }
            console.log(`${dryRun ? "[dry-run] " : ""}${file}`);
        }
    }
}

console.log(
    dryRun
        ? `Dry run complete. ${changedFiles} file(s) would change.`
        : `Anonymised ${changedFiles} file(s).`,
);

function collectJsonFiles(root) {
    const files = [];

    if (!fs.existsSync(root)) {
        throw new Error(`Path does not exist: ${root}`);
    }

    const stat = fs.statSync(root);
    if (stat.isFile()) {
        if (root.endsWith(".json")) files.push(root);
        return files;
    }

    walkDir(root, files);
    return files;
}

function walkDir(dir, files) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            walkDir(fullPath, files);
        } else if (entry.isFile() && fullPath.endsWith(".json")) {
            files.push(fullPath);
        }
    }
}

function anonymiseValue(value, keyPath) {
    if (Array.isArray(value)) {
        let changed = false;
        const items = value.map((item, index) => {
            const [next, itemChanged] = anonymiseValue(item, keyPath.concat(String(index)));
            changed ||= itemChanged;
            return next;
        });
        return [changed ? items : value, changed];
    }

    if (value && typeof value === "object") {
        let changed = false;
        const result = {};
        for (const [key, child] of Object.entries(value)) {
            const [next, childChanged] = anonymiseValue(child, keyPath.concat(key));
            result[key] = next;
            changed ||= childChanged;
        }
        return [changed ? result : value, changed];
    }

    if (typeof value !== "string") {
        return [value, false];
    }

    const key = keyPath[keyPath.length - 1] ?? "";
    const lowerKey = key.toLowerCase();
    const original = value;

    if (UUID_RE.test(original) && GENERIC_ID_RE.test(lowerKey) && !isPersonalIdentifierKey(lowerKey)) {
        return [original, false];
    }

    for (const [pattern, category] of personalKeyMatchers) {
        if (!pattern.test(lowerKey)) continue;
        const replacement = replacementFor(category, original, keyPath);
        return [replacement, replacement !== original];
    }

    let scrubbed = value;
    for (const [pattern, replacement] of freeTextScrubbers) {
        scrubbed = scrubbed.replace(pattern, replacement);
    }
    return [scrubbed, scrubbed !== original];
}

function replacementFor(category, original, keyPath) {
    const seed = `${category}:${keyPath.join(".")}:${original}`;

    switch (category) {
        case "firstName":
            return memoise(cache.firstName, original, () => choose(seed, FIRST_NAMES));
        case "lastName":
            return memoise(cache.lastName, original, () => choose(seed, LAST_NAMES));
        case "fullName":
            return memoise(cache.fullName, original, () => `${fakeFirstName(seed)} ${fakeLastName(seed)}`);
        case "address":
            return memoise(cache.address, original, () => `${1 + hashInt(seed, 80)} ${choose(seed, STREETS)}`);
        case "city":
            return memoise(cache.city, original, () => choose(seed, CITIES));
        case "postcode":
            return memoise(cache.postcode, original, () => choose(seed, POSTCODES));
        case "email":
            return memoise(cache.email, original, () => `person-${hashInt(seed, 100000)}@example.com`);
        case "phone":
            return memoise(cache.phone, original, () => `07123 ${String(hashInt(seed, 1000000)).padStart(6, "0").slice(0, 6)}`);
        case "dob":
            return memoise(cache.dob, original, () => fakeDateOfBirth(seed));
        case "identifier":
            return memoise(cache.identifier, original, () => `${hashHex(seed).slice(0, 8)}-${hashHex(seed).slice(8, 12)}-${hashHex(seed).slice(12, 16)}`);
        default:
            return original;
    }
}

function fakeFirstName(seed) {
    return choose(`first:${seed}`, FIRST_NAMES);
}

function fakeLastName(seed) {
    return choose(`last:${seed}`, LAST_NAMES);
}

function fakeDateOfBirth(seed) {
    const start = new Date("1970-01-01T00:00:00.000Z").getTime();
    const end = new Date("2005-12-31T00:00:00.000Z").getTime();
    const span = end - start;
    const offset = hashInt(seed, span);
    return new Date(start + offset).toISOString().slice(0, 10);
}

function choose(seed, values) {
    return values[hashInt(seed, values.length)];
}

function hashInt(seed, modulo) {
    const bytes = createHash("sha256").update(seed).digest();
    const value = bytes.readUInt32BE(0);
    return value % modulo;
}

function hashHex(seed) {
    return createHash("sha256").update(seed).digest("hex");
}

function memoise(map, key, factory) {
    if (!map.has(key)) {
        map.set(key, factory());
    }
    return map.get(key);
}

function isPersonalIdentifierKey(lowerKey) {
    return (
        lowerKey === "defendantasn" ||
        lowerKey === "nationalinsurancenumber" ||
        lowerKey === "nino" ||
        lowerKey === "passportnumber" ||
        lowerKey === "passport" ||
        lowerKey === "drivinglicencenumber" ||
        lowerKey === "drivinglicence"
    );
}
