import LocaleManager from "./LocaleManager.js";

export default class Locales{
    private _locales: Map<string, LocaleManager> = new Map<string, LocaleManager>;
    public path = '/locales';

    /**
     * 
     * @param path Path including protocol (`file://` or `https://`)
     */
    constructor(path?: string){
        this.path = path;
    }

    /**
     * 
     * @param path Path including protocol (`file://` or `https://`)
     * @returns 
     */
    public setPath(path: string): Locales{
        this.path = path;
        return this;
    }

    public async getLocale(language: string): Promise<LocaleManager>{
        if(this._locales.has(language)) return this._locales.get(language);
        const result = await LocaleManager.getByLanguage(this, language);

        this._locales.set(language, result);
        return result;
    }

    public async getString(language: string, key: string): Promise<string>{
        const locale = await this.getLocale(language);
        return await locale.getString(key);
    }
}