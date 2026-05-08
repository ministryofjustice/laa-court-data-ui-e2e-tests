import NewPage from "../Page/NewPage.js";
import BreachPageLocator from "../Page-locators/breach_page.lo.js";

export default class BreachPage extends NewPage {
    constructor(page, parameters) {
        super(page, parameters);
        this.locators = new BreachPageLocator(page);
    }
}