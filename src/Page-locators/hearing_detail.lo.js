import NewPage from "../Page/NewPage.js";

export default class HearingDetailLocators extends NewPage {
    get nextLink() {
        return this.page.getByRole('link', { name: 'Next' });
    }

    get previousLink() {
        return this.page.getByRole('link', { name: 'Previous' });
    }
}
