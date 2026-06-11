import { chromium, firefox, webkit } from "@playwright/test";

function browserTypeFor(name = "chromium") {
    switch (name) {
        case "firefox":
            return firefox;
        case "webkit":
            return webkit;
        case "chromium":
        default:
            return chromium;
    }
}

export async function launchBrowser(parameters) {
    const browserName = parameters.browser || "chromium";
    const browserType = browserTypeFor(browserName);
    return browserType.launch({ headless: parameters.headless !== false });
}
