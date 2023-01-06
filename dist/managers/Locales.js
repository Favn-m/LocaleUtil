import LocaleManager from "./LocaleManager.js";
export default class Locales {
    _locales = new Map;
    _path;
    /**
     *
     * @param path Path to the folder where locales are located
     */
    constructor(path = './locales') {
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
        this._path = path;
        return this;
    }
    get path() {
        return this._path;
    }
    async getLocale(language) {
        if (this._locales.has(language))
            return this._locales.get(language);
        const result = await LocaleManager.getByLanguage(this, language);
        this._locales.set(language, result);
        return result;
    }
    async getString(language, key, options) {
        const locale = await this.getLocale(language);
        return await locale.getString(key, options);
    }
}
