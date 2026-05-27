
export default class NewPage {
    constructor(page, parameters = {}) {
        this.page = page;
        this.parameters = parameters;
    }

    get devUrl() {
        return this.parameters.devUrl;
    }
}