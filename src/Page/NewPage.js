
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

    get appBaseUrl() {
        return this.parameters.baseUrl || this.parameters.devUrl;
    }

    resolveUrl(pathOrUrl) {
        if (/^https?:\/\//i.test(pathOrUrl)) {
            return pathOrUrl;
        }

        const currentUrl = this.page.url();
        const currentOrigin = /^https?:\/\//i.test(currentUrl)
            ? new URL("/", currentUrl).toString()
            : null;
        const fallbackBase = this.appBaseUrl
            ? new URL("/", this.appBaseUrl).toString()
            : null;

        if (!currentOrigin && !fallbackBase) {
            throw new Error(`Unable to resolve URL for path: ${pathOrUrl}`);
        }

        return new URL(pathOrUrl, currentOrigin || fallbackBase).toString();
    }

    async navigateTo(pathOrUrl, options = {}) {
        return this.page.goto(this.resolveUrl(pathOrUrl), options);
    }
}