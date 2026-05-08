/**
 * generate-auth.js
 *
 * Performs a one-time Microsoft SSO login using credentials from .env and
 * persists the resulting Playwright browser session to data/auth/user.json.
 *
 * Run this script before executing the test suite against a UAT/production
 * environment where the @dev-auth dropdown is not available:
 *
 *   node generate-auth.js
 *
 * The produced data/auth/user.json has the structure:
 *
 *   {
 *     "cookies": [
 *       {
 *         "name": "string",
 *         "value": "string",
 *         "domain": "string",
 *         "path": "string",
 *         "expires": 1234567890,   // unix epoch seconds, -1 = session
 *         "httpOnly": true,
 *         "secure": true,
 *         "sameSite": "None"       // "Strict" | "Lax" | "None"
 *       }
 *     ],
 *     "origins": [
 *       {
 *         "origin": "https://...",
 *         "localStorage": []
 *       }
 *     ]
 *   }
 *
 * Playwright's newContext({ storageState: 'data/auth/user.json' }) reads this
 * file and restores the session so each test scenario starts already logged in.
 */

import dotenv from 'dotenv';
import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';

dotenv.config({ path: '.env' });

const VCD_URL   = process.env.VCD_URL;
const EMAIL     = process.env.EMAIL;
const PASSWORD  = process.env.PASSWORD;
const OUT_PATH  = path.resolve('data/auth/user.json');

if (!VCD_URL || !EMAIL || !PASSWORD) {
    console.error(
        'Missing required env variables. Ensure .env defines VCD_URL, EMAIL and PASSWORD.'
    );
    process.exit(1);
}

async function run() {
    console.log(`Launching browser to authenticate at ${VCD_URL} ...`);

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page    = await context.newPage();

    // ── 1. Navigate to the application ───────────────────────────────────────
    await page.goto(VCD_URL);
    await page.waitForLoadState('networkidle');

    // ── 2. Microsoft SSO — email step ─────────────────────────────────────────
    // The app redirects to login.microsoftonline.com.
    // Microsoft renders the email input with name="loginfmt".
    await page.waitForSelector('input[name="loginfmt"]', { timeout: 15000 });
    await page.fill('input[name="loginfmt"]', EMAIL);
    await page.click('input[type="submit"]');   // "Next" button

    // ── 3. Microsoft SSO — password step ──────────────────────────────────────
    await page.waitForSelector('input[name="passwd"]', { timeout: 15000 });
    await page.fill('input[name="passwd"]', PASSWORD);
    await page.click('input[type="submit"]');   // "Sign in" button

    // ── 4. "Stay signed in?" prompt — click No to avoid KMSI complications ────
    const staySignedIn = page.locator('[data-testid="idBtn_Back"]');
    try {
        await staySignedIn.waitFor({ timeout: 5000 });
        await staySignedIn.click();
    } catch {
        // Prompt did not appear — that is fine, continue.
    }

    // ── 5. Wait for the app to finish loading after redirect ──────────────────
    await page.waitForURL(`${VCD_URL}**`, { timeout: 30000 });
    await page.waitForLoadState('networkidle');

    // ── 6. Persist session ────────────────────────────────────────────────────
    await fs.mkdir(path.dirname(OUT_PATH), { recursive: true });
    await context.storageState({ path: OUT_PATH });

    await browser.close();

    console.log(`Auth session saved to ${OUT_PATH}`);
}

run().catch(err => {
    console.error('Auth generation failed:', err.message);
    process.exit(1);
});

const jsonVal = cookies
const base64String = btoa(JSON.stringify(cookies.cookies));

const finalString = btoa(jsonVal)
