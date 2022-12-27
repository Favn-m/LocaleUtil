import LocaleManager from "./LocaleManager.js";

export default class Locales{
    private _locales: Map<string, LocaleManager> = new Map<string, LocaleManager>;
    private _path;

    /**
     * 
     * @param path Path to the folder where locales are located
     */
    constructor(path: string = '/locales'){
        this.setPath(path);
    }

    /**
     * 
     * @param path Path to the folder where locales are located
     * @returns 
     */
    public setPath(path: string): Locales{
        if(!path) return this;
        this._path = Locales.resolvePath(path);
        return this;
    }

    get path(){
        return this._path;
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


    private static resolvePath(path: string): string{
        if(path.startsWith('.')) return this.resolvePath(path.slice(1));
        if(path.startsWith('/')) path = process.cwd()+path;
        if(!(/^(https|file|http):\/\/.*/i.test(path))) path = "file://"+path;
        return path;
    }
}