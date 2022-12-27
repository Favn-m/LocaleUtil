import LocaleManager from "./LocaleManager.js";
export default class Locales {
    _locales = new Map;
    path = '/locales';
    /**
     *
     * @param path Path including protocol (`file://` or `https://`)
     */
    constructor(path) {
        this.path = path;
    }
    /**
     *
     * @param path Path including protocol (`file://` or `https://`)
     * @returns
     */
    setPath(path) {
        this.path = path;
        return this;
    }
    async getLocale(language) {
        if (this._locales.has(language))
            return this._locales.get(language);
        const result = await LocaleManager.getByLanguage(this, language);
        this._locales.set(language, result);
        return result;
    }
    async getString(language, key) {
        const locale = await this.getLocale(language);
        return await locale.getString(key);
    }
}
