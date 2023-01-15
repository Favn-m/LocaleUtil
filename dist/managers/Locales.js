import LocaleManager from "./LocaleManager.js";
import fs from "fs/promises";
import EventEmitter from "events";
export default class Locales extends EventEmitter {
    _locales = new Map;
    _path;
    defaultLanguage;
    constructor(options = { path: './locales', fetchAllOnStart: false, defaultLanguage: 'en-US' }) {
        super();
        this.setPath(options.path);
        this.defaultLanguage = options.defaultLanguage;
        if (options.fetchAllOnStart)
            this.fetchAllLocales().then(() => { super.emit('ready', this); });
        else
            super.emit('ready', this);
    }
    async fetchAllLocales() {
        const files = await fs.readdir(this._path);
        const promises = [];
        for (const file of files) {
            if (file.endsWith('.json'))
                promises.push(this.getLocale(file.slice(0, file.length - 5)));
        }
        return await Promise.all(promises);
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
        try {
            const result = await LocaleManager.getByLanguage(this, language);
            this._locales.set(language, result);
            return result;
        }
        catch (e) {
            return await this.getLocale(this.defaultLanguage);
        }
    }
    getCachedLocale(language) {
        return this._locales.get(language);
    }
    async getString(language, key, replaceOptions) {
        const locale = await this.getLocale(language);
        return locale.getString(key, replaceOptions);
    }
    getAllStrings(key, selectOptions = {}) {
        const result = {};
        if (selectOptions.include?.length > 0 && Array.isArray(selectOptions.include)) {
            for (const locale of selectOptions.include) {
                result[locale] = this._locales.get(locale).getString(key, selectOptions.replace);
            }
        }
        else {
            for (const [locale, value] of this._locales.entries()) {
                if (!selectOptions?.exclude?.includes(locale))
                    result[locale] = value.getString(key, selectOptions.replace);
            }
        }
        return result;
    }
}
