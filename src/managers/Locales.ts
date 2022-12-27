import LocaleManager from "./LocaleManager.js";

export default class Locales{
    private _locales: Map<string, LocaleManager> = new Map<string, LocaleManager>;
    public path = '/locales';

    /**
     * 
     * @param path Path to the folder where locales are located
     */
    constructor(path?: string){
        this.setPath(path);
    }

    /**
     * 
     * @param path Path to the folder where locales are located
     * @returns 
     */
    public setPath(path: string): Locales{
        if(!path) return this;
        if(!(/^(https|file|http):\/\/.*/i.test(path))) path = "file://"+path;
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