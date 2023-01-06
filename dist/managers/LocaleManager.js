import fs from 'node:fs/promises';
export default class LocaleManager {
    language;
    _localeKeys = new Map();
    _localeFile;
    _locales;
    constructor(locales, language) {
        this.language = language;
        this._locales = locales;
    }
    async getLocales() {
        this._localeFile = JSON.parse((await fs.readFile(`${this._locales.path}/${this.language}.json`)).toString());
        for (let [key, value] of Object.entries(this._localeFile)) {
            if (typeof value !== 'object') {
                this._localeKeys.set(key.toLowerCase(), value);
            }
            else {
                this.getKey(key.toLowerCase(), value);
            }
        }
        return this._localeFile;
    }
    getKey(currentKey, currentValue) {
        for (let [key, value] of Object.entries(currentValue)) {
            if (typeof value !== 'object') {
                this._localeKeys.set((`${currentKey}.${key}`).toLowerCase(), value);
            }
            else {
                this.getKey((`${currentKey}.${key}`).toLowerCase(), value);
            }
        }
    }
    getString(key, options) {
        key = key.toLowerCase();
        if (!options) {
            return this._localeKeys.get(key);
        }
        else {
            let result = this._localeKeys.get(key);
            for (let key in options) {
                const regex = new RegExp(`(?<=[^\\\\]){${key.replace(`\\`, `\\\\`)}}`, 'g');
                result = result.replace(regex, options[key]);
            }
            result = result.replace(`\\{`, `{`);
            return result;
        }
    }
    //Static
    static async getByLanguage(locales, language) {
        const result = new LocaleManager(locales, language);
        await result.getLocales();
        return result;
    }
}
