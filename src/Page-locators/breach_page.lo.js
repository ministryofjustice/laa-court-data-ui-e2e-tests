import NewPage from "../Page/NewPage.js";

export default class BreachPageLocators extends NewPage {

    get breachTag() {
        return this.page.getByRole('strong').filter({ hasText: 'Breach' });
    }
}