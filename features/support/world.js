import { setWorldConstructor, World } from "@cucumber/cucumber";
import { CommonPlatformTestData } from "../../lib/common_platform_test_data.js";

export class CustomWorld extends World {
    constructor(options) {
        super(options);

        this.browser = null;
        this.context = null;
        this.page = null;

        // Page objects — initialised in hooks.js Before hook
        this.signIn = null;
        this.searchPage = null;
        this.homePage = null;
        this.caseSummaryPage = null;
        this.hearingDetailPage = null;
        this.usersPage = null;
        this.genericPage = null;
        this.caseDetailPage = null;
        this.courtApplicationPage = null;
        this.defendantPage = null;
        this.breachPage = null;
        this.linkCasesPage = null;

        this.scenario = null;
        this.authMode = "stored-state";
    }

    getAuthModeFromTags() {
        const tags = this.scenario?.pickle?.tags || [];

        if (tags.some(tag => tag.name === "@dev-auth")) {
            return "dev-auth";
        }

        if (tags.some(tag => tag.name === "@smoke-test")) {
            return "smoke-test";
        }
        return "stored-state";
    }

    isDevAuthScenario() {
        return this.authMode === "dev-auth";
    }

    get urls() {
        return {
            baseUrl: this.parameters.baseUrl,
            devUrl: this.parameters.devUrl,
            uatUrl: this.parameters.uatUrl
        };
    }

    get testData() {
        return this.parameters.testData || {};
    }

    loadDataset(name) {
        return new CommonPlatformTestData(name).content;
    }

    async loginAsDefaultUser() {
        if (this.authMode === "dev-auth") {
            await this.signIn.signInAs(this.parameters.defaultEmail);
            return;
        }

        await this.signIn.signIn();
        // After SSO flow completes, navigate to search page if not already there
        await this.page.waitForLoadState("networkidle");
        const currentUrl = this.page.url();
        if (!currentUrl.includes('/search_filters')) {
            await this.page.goto(`${this.parameters.baseUrl}/search_filters/new`);
            await this.page.waitForLoadState('networkidle');
        }
    }
}

setWorldConstructor(CustomWorld);