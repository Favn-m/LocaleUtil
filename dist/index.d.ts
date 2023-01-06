export class LocaleManager{
    constructor(locales: Locales, language: string);

    public getString(key: string, options?: object): string;
    private getLocales(): Promise<object>;
    private getKey(): undefined;

    public static getByLanguage(locales: Locales, language: string): Promise<LocaleManager>;
}


export class Locales{
    constructor(path?: string);

    public getString(language: string, key: string, options?: object): Promise<string>;
    public setPath(path: string): Locales;
    public getLocale(language: string): Promise<LocaleManager>;
}