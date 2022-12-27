import LocaleManager from "./LocaleManager.js";
export default class Locales {
    _locales = new Map;
    path = '/locales';
    /**
     *
     * @param path Path to the folder where locales are located
     */
    constructor(path) {
        this.setPath(path);
    }
    /**
     *
     * @param path Path to the folder where locales are located
     * @returns
     */
    setPath(path) {
        if (!path)
            return this;
        if (!(/^(https|file|http):\/\/.*/i.test(path)))
            path = "file://" + path;
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
