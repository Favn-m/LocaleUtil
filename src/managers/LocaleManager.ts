import Locales from "./Locales.js";

export default class LocaleManager{
    public language: string;

    private _localeFile: object;
    private _locales: Locales;

    constructor(locales: Locales, language: string){
        this.language = language;
        this._locales = locales;
    }

    private async getLocales(): Promise<object>{
        this._localeFile = await import(`${this._locales.path}/${this.language}.json`, {assert: { type: 'json' }}).then(locale=>locale.default);
        return this._localeFile;
    }

    public getString(key: string): string{
        return this._localeFile[key];
    }


    //Static

    public static async getByLanguage(locales: Locales, language: string): Promise<LocaleManager>{
        const result = new LocaleManager(locales, language);
        await result.getLocales();

        return result;
    }
}