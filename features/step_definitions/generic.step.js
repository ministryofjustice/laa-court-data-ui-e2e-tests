import { When,setDefaultTimeout, After } from "@cucumber/cucumber";

setDefaultTimeout(60 * 1000);

When("User selects the {word} icon from the breadcrumbs", async (value) => {
    this.homePage.selectBreadcrumb(value)
});