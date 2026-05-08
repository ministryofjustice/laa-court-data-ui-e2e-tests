import HomePageLocators from "../Page-locators/home.lo.js";
import NewPage from "../Page/NewPage.js";


export default class HomePage extends NewPage {
    constructor(page, parameters) {
        super(page, parameters);
        this.locators = new HomePageLocators(page);
    }

    async selectBreadcrumb(breadcrumb) {
        await this.locators.header.breadcrumbs.getByText(breadcrumb).click();
        await this.page.waitForLoadState();
    }

    async logout() {
        const isVisible = await this.locators.header.logout
            .isVisible({ timeout: 2000 })
            .catch(() => false);

        if (!isVisible) {
            return;
        }

        await this.locators.header.logout.click();
        await this.page.waitForLoadState("networkidle");
    }
}