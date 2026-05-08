
export default class NewPage {
    constructor(page, parameters = {}) {
        this.page = page;
        this.parameters = parameters;
    }

    get baseUrl() {
        return this.parameters.baseUrl;
    }

    get devUrl() {
        return this.parameters.devUrl;
    }
}