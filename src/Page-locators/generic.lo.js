import NewPage from "../Page/NewPage.js";

export default class GenericLocators extends NewPage {
    get body() {
        return this.page.locator('body');
    }

    get heading() {
        return this.page.locator('h1');
    }

    subheading(text) {
        return this.page.locator('h2', { hasText: text });
    }

    linkByName(linkText) {
        return this.page.getByRole('link', { name: linkText });
    }
}
