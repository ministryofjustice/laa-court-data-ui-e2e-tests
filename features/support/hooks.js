import { Before, After } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";
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


const AuthFile = "playwright/.auth/user2.json";

Before(async function (scenario) {
    const hasDevAuthTag = scenario?.pickle?.tags?.some(tag => tag.name === "@dev-auth");
    this.browser = await chromium.launch({ headless: false });
    this.context = hasDevAuthTag
        ? await this.browser.newContext()
        : await this.browser.newContext({ storageState: 'data/auth/user.json' });
    
    this.page = await this.context.newPage();
    this.signIn = new SignInPage(this.page);
    this.searchPage = new SearchPage(this.page);
    this.homePage = new HomePage(this.page);
    this.caseSummaryPage = new CaseSummaryPage(this.page);
    this.hearingDetailPage = new HearingDetailPage(this.page);
    this.usersPage = new UsersPage(this.page);
    this.genericPage = new GenericPage(this.page);
    this.caseDetailPage = new CaseDetailPage(this.page);
    this.courtApplicationPage = new CourtApplicationPage(this.page);
    this.defendantPage = new DefendantPage(this.page);
    this.worldContext = scenario
});

After(async function () {
    await this.browser.close();
});