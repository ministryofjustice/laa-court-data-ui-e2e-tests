#!/usr/bin/env node

/**
 * Decodes the COOKIES environment variable (base64-encoded Playwright storage state)
 * into data/auth/user.json so tests can run pre-authenticated.
 *
 * Usage:
 *   node scripts/restore-auth.js
 *
 * Skips silently if COOKIES is not set or the file already exists.
 */

import fs from "node:fs";
import path from "node:path";

const OUT_PATH = path.resolve("data/auth/user.json");

if (fs.existsSync(OUT_PATH)) {
    console.log(`✓ Auth file already exists at ${OUT_PATH}, skipping decode.`);
    process.exit(0);
}

const cookies = process.env.COOKIES;

if (!cookies) {
    console.log("COOKIES env var not set — skipping auth restore.");
    process.exit(0);
}

fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });

const decoded = Buffer.from(cookies, "base64").toString("utf-8");

try {
    JSON.parse(decoded);
} catch {
    console.error("✗ COOKIES env var is not valid base64-encoded JSON.");
    process.exit(1);
}

fs.writeFileSync(OUT_PATH, decoded, "utf-8");
console.log(`✓ Auth storage state decoded from COOKIES to ${OUT_PATH}`);
