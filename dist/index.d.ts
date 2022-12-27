declare module 'localeutil'{
    export class LocaleManager{
        constructor(locales: Locales, language: string);
    
        public getString(key: string): string;
        private getLocales(): Promise<object>;
    
        public static getByLanguage(locales: Locales, language: string): Promise<LocaleManager>;
    }
    
    
    export class Locales{
        constructor(path?: string);
    
        public getString(language: string, key: string): Promise<string>;
        public setPath(path: string): Locales;
        public getLocale(language: string): Promise<LocaleManager>;
    }
}
