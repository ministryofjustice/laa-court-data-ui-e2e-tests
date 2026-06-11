import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const authDir = path.resolve(__dirname, "../../data/auth");
const authFilePath = path.join(authDir, "user.json");

/**
 * Generates auth storage state by performing SSO login.
 * Stores the session cookies/tokens to data/auth/user.json for reuse.
 * Called once per test run if the file doesn't exist.
 */
export async function ensureAuthStorageState(parameters) {
    // Check if auth file already exists
    try {
        await fs.access(authFilePath);
        console.log(`✓ Auth storage state already exists at ${authFilePath}`);
        return authFilePath;
    } catch {
        // File doesn't exist, generate it
    }

    console.log(`⚙️  Generating auth storage state...`);

    const email = parameters.defaultEmail;
    const baseUrl = parameters.baseUrl;

    if (!email || !baseUrl) {
        throw new Error(
            `Cannot generate auth: missing EMAIL (${email}) or VCD_URL (${baseUrl}) in environment`
        );
    }

    // Create a temporary browser instance for SSO login
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        console.log(`  → Navigating to ${baseUrl}`);
        await page.goto(baseUrl);

        // Wait for SSO redirect or login form to complete
        // The VCD app will handle SSO; we just need to wait for navigation to settle
        await page.waitForLoadState("networkidle");

        // Check if we're authenticated by looking for a sign-in button or home page indicator
        const isSignedIn = await page.locator("button:has-text('Sign out')").isVisible({ timeout: 5000 }).catch(() => false);

        if (!isSignedIn) {
            throw new Error(
                `Auth setup failed: unable to authenticate with ${email}. ` +
                `Check that VCD_URL is reachable and SSO is working.`
            );
        }

        console.log(`  ✓ Authenticated as ${email}`);

        // Create the auth directory if it doesn't exist
        await fs.mkdir(authDir, { recursive: true });

        // Save the session storage state (cookies, local storage, etc.)
        await context.storageState({ path: authFilePath });
        console.log(`  ✓ Auth storage state saved to ${authFilePath}`);

        return authFilePath;
    } finally {
        await context.close();
        await browser.close();
    }
}
