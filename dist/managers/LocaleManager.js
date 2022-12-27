export default class LocaleManager {
    language;
    _localeFile;
    _locales;
    constructor(locales, language) {
        this.language = language;
        this._locales = locales;
    }
    async getLocales() {
        this._localeFile = await import(`${this._locales.path}/${this.language}.json`, { assert: { type: 'json' } }).then(locale => locale.default);
        return this._localeFile;
    }
    getString(key) {
        return this._localeFile[key];
    }
    //Static
    static async getByLanguage(locales, language) {
        const result = new LocaleManager(locales, language);
        await result.getLocales();
        return result;
    }
}
