import NewPage from "../Page/NewPage.js";
import GenericLocators from "../Page-locators/generic.lo.js";

export default class GenericPage extends NewPage {
    constructor(page) {
        super(page);
        this.locators = new GenericLocators(page);
    }

    async clickLink(linkText) {
        await this.locators.linkByName(linkText).click();
    }

    signInBox() {
        return this.locators.signInMessageBox;
    }

    body() {
        return this.locators.body;
    }

    heading() {
        return this.locators.heading;
    }

    subheading(text) {
        return this.locators.subheading(text);
    }

    async clickSearchLink() {
        await this.locators.searchLink.click();
    }

    async goBackToUserPage() {
        await this.locators.backToUsersLink.click();
    }
}
