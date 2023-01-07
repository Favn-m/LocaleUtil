import LocaleManager from "./LocaleManager.js";
import fs from "fs/promises";
import { EventEmitter } from "stream";

interface LocalesOptions {
    /**
     * Path to the locales folder
     */
    path?: string
    /**
     * Whether to get fetch all locales when initializing `Locales`, or do it manually
     * Note, that if you want to get all translations for specific string, it will get only from cached locales(locales you have already worked with after process started)
     */
    fetchAllOnStart?: boolean
}

export default class Locales extends EventEmitter{
    private _locales: Map<string, LocaleManager> = new Map<string, LocaleManager>;
    private _path;

    constructor(options: LocalesOptions = {path: './locales', fetchAllOnStart: true}){
        super();
        this.setPath(options.path);
        if(options.fetchAllOnStart) this.fetchAllLocales().then(()=>{super.emit('ready', this)});
        else super.emit('ready', this)
    }

    private async fetchAllLocales(){
        const files = await fs.readdir(this._path);
        const promises = [];
        for(const file of files){
            if(file.endsWith('.json')) promises.push(this.getLocale(file.slice(0, file.length-5)));
        }
        return await Promise.all(promises);
    }

    /**
     * 
     * @param path Path to the folder where locales are located
     * @returns 
     */
    public setPath(path: string): Locales{
        if(!path) return this;
        this._path = path;
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

    public async getString(language: string, key: string, options?: object): Promise<string>{
        const locale = await this.getLocale(language);
        return locale.getString(key, options);
    }

    public getAllStrings(key: string, options?: object): object{
        const result = {};
        for(const [locale, value] of this._locales.entries()){
            result[locale]=value.getString(key, options);
        }
        return result;
    }
}