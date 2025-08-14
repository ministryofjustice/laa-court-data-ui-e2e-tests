import { chromium } from "@playwright/test"

export const chromiumPageAndBrowser = async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  return { browser, page }
}
