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

        this.scenario = null;
        this.authMode = "stored-state";
    }

    isDevAuthScenario() {
        return this.scenario?.pickle?.tags?.some(tag => tag.name === "@dev-auth") === true;
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
        await this.page.waitForLoadState();
        await this.homePage.selectBreadcrumb("Home");
        await this.page.waitForLoadState();
    }
}

setWorldConstructor(CustomWorld);