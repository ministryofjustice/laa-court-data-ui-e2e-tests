import { Before, After, Status } from "@cucumber/cucumber";
import path from "node:path";
import fs from "node:fs/promises";
import { launchBrowser } from "./browser.js";
import { ensureAuthStorageState } from "./auth-setup.js";
import SignInPage from "../../src/Page-objects/signIn.po.js";
import SearchPage from "../../src/Page-objects/search.po.js";
import HomePage from "../../src/Page-objects/home.po.js";
import CaseSummaryPage from "../../src/Page-objects/case_summary.po.js";
import HearingDetailPage from "../../src/Page-objects/hearing_detail.po.js";
import UsersPage from "../../src/Page-objects/users.po.js";
import GenericPage from "../../src/Page-objects/generic.po.js";
import CaseDetailPage from "../../src/Page-objects/case_detail.po.js";
import CourtApplicationPage from "../../src/Page-objects/court_application.po.js";
import DefendantPage from "../../src/Page-objects/defendant_page.po.js";
import BreachPage from "../../src/Page-objects/breach.po.js";
import LinkCasesPage from "../../src/Page-objects/link_cases.po.js";

Before(async function (scenario) {
    this.scenario = scenario;
    this.authMode = this.isDevAuthScenario() ? "dev-auth" : "stored-state";

    console.log(`[config] Scenario: ${scenario.pickle.name}`);
    console.log(`[config] Auth mode: ${this.authMode}`);
    console.log(`[config] Parameters:`, JSON.stringify(this.parameters, null, 2));

    this.browser = await launchBrowser(this.parameters);

    const contextOptions = {};
    if (this.authMode !== "dev-auth") {
        // Ensure auth storage state exists; generate it if needed
        await ensureAuthStorageState(this.parameters);
        contextOptions.storageState = this.parameters.authStorageState;
        contextOptions.permissions = ["clipboard-read", "clipboard-write"];
    }
    else {
        contextOptions.permissions = ["clipboard-read", "clipboard-write"];
    }

    this.context = await this.browser.newContext(contextOptions);

    if (process.env.TRACE === "true") {
        await this.context.tracing.start({
            screenshots: true,
            snapshots: true,
            sources: true
        });
    }

    this.page = await this.context.newPage();

    const pageParams = { ...this.parameters, authMode: this.authMode };
    this.signIn = new SignInPage(this.page, pageParams);
    this.searchPage = new SearchPage(this.page, pageParams);
    this.homePage = new HomePage(this.page, pageParams);
    this.caseSummaryPage = new CaseSummaryPage(this.page, pageParams);
    this.hearingDetailPage = new HearingDetailPage(this.page, pageParams);
    this.usersPage = new UsersPage(this.page, pageParams);
    this.genericPage = new GenericPage(this.page, pageParams);
    this.caseDetailPage = new CaseDetailPage(this.page, pageParams);
    this.courtApplicationPage = new CourtApplicationPage(this.page, pageParams);
    this.defendantPage = new DefendantPage(this.page, pageParams);
    this.breachPage = new BreachPage(this.page, pageParams);
    this.linkCasesPage = new LinkCasesPage(this.page, pageParams);

    this.log(`Auth mode: ${this.authMode}`);
});

After(async function (scenario) {
    if (scenario.result?.status === Status.FAILED && this.page) {
        this.log(`Failed scenario: ${scenario.pickle.name}`);
        this.log(`URL at failure: ${this.page.url()}`);

        const screenshot = await this.page.screenshot({ fullPage: true });
        await this.attach(screenshot, "image/png");
    }

    if (process.env.TRACE === "true" && this.context) {
        await fs.mkdir("reports/traces", { recursive: true });
        const safeName = scenario.pickle.name
            .replace(/[^a-z0-9-_]+/gi, "-")
            .toLowerCase();
        const tracePath = path.join("reports", "traces", `${safeName}.zip`);
        await this.context.tracing.stop({ path: tracePath });

        if (scenario.result?.status === Status.FAILED) {
            this.log(`Trace saved to ${tracePath}`);
        }
    }

    if (this.context) {
        await this.context.close();
    }

    if (this.browser) {
        await this.browser.close();
    }
});