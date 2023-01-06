import Locales from "./Locales.js";
import fs from 'node:fs/promises';

export default class LocaleManager{
    public language: string;

    private _localeKeys: Map<string, string> = new Map();

    private _localeFile: object;
    private _locales: Locales;

    constructor(locales: Locales, language: string){
        this.language = language;
        this._locales = locales;
    }

    private async getLocales(): Promise<object>{
        this._localeFile = JSON.parse((await fs.readFile(`${this._locales.path}/${this.language}.json`)).toString());
        
        for(let [key, value] of Object.entries(this._localeFile)){
            if(typeof value !== 'object') {
                this._localeKeys.set(key.toLowerCase(), value);
            } else{
                this.getKey(key.toLowerCase(), value);
            }
        }

        return this._localeFile;
    }

    private getKey(currentKey: string, currentValue: string|object){
        for(let [key, value] of Object.entries(currentValue)){
            if(typeof value !== 'object') {
                this._localeKeys.set((`${currentKey}.${key}`).toLowerCase(), value);
            } else{
                this.getKey((`${currentKey}.${key}`).toLowerCase(), value);
            }
        }
    }

    public getString(key: string, options?: object): string{
        key=key.toLowerCase();
        if(!options){
            return this._localeKeys.get(key);
        } else{
            let result = this._localeKeys.get(key);
            for(let key in options){
                const regex = new RegExp(`(?<=[^\\\\]){${key.replace(`\\`, `\\\\`)}}`, 'g')
                result = result.replace(regex, options[key]);
            }
            result=result.replace(`\\{`, `{`);
            return result;
        }
    }


    //Static

    public static async getByLanguage(locales: Locales, language: string): Promise<LocaleManager>{
        const result = new LocaleManager(locales, language);
        await result.getLocales();

        return result;
    }
}