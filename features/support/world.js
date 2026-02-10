import { setWorldConstructor } from "@cucumber/cucumber";

class CustomWorld {
    constructor() {
        this.page = null;
        this.browser = null;
        this.context = null;
        this.signIn = null;
        this.searchPage = null;
        this.homePage = null;
        this.caseSummaryPage = null;
        this.hearingDetailPage = null;
        this.usersPage = null;
        this.genericPage = null;
        this.caseDetailPage = null;
        this.courtApplicationPage = null;
    }
}

setWorldConstructor(CustomWorld);