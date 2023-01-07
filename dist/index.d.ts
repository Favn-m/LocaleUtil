import { EventEmitter } from "stream"

export class LocaleManager{
    constructor(locales: Locales, language: string);

    public getString(key: string, options?: object): string;
    private getLocales(): Promise<object>;
    private getKey(): undefined;

    public static getByLanguage(locales: Locales, language: string): Promise<LocaleManager>;
}

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

export class Locales extends EventEmitter{
    constructor(options: LocalesOptions);

    public once(event: 'ready', listener: (locales: Locales) => void);

    /**
     * 
     * @param path Path to the folder where locales are located
     * @returns 
     */
    public setPath(path: string): Locales;
    public getLocale(language: string): Promise<LocaleManager>;
    
    public getString(language: string, key: string, options?: object): Promise<string>;
    public getAllStrings(key: string, options?: object): object
}