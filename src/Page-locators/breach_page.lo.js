import NewPage from "../Page/NewPage.js";

export default class BreachPageLocators extends NewPage {

    tag(type) {
        return this.page.getByRole('strong').filter({ hasText: type });
    }
}