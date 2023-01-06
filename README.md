# LocaleUtil

 `-` Easy to use utility to work with locales!<br>
 `-` Almost fully uses promises<br>

Basically, there is 2 ways to get locale

## Get locale manager

Most often used if you need to get more than 1 string,<br>
`<Locales>.getLocale(language: string)`, example:
```js
//Define path to the locales(starts from PROJECT directory)
const locales = new Locales("./locales/");

const ukrainian = await locales.getLocale('uk-UA');   //Get locale(json file) named "uk-UA"
const english = await locales.getLocale('en-US');     //Get locale(json file) named "en-US"

console.log({
    ukrainian: ukrainian.getString('hello.world'),    // ukrainian: Привіт, світ!
    english: english.getString('hello.world')         // english: Hello, world!
});
```

## Get one string of locale

Most often used if you need to get only one string(returns `Promise<string>`),<br>
`<Locales>.getString(language: string, key: string)`, example:
```js
//Define path to the locales(starts from PROJECT directory)
const locales = new Locales("./locales/");

console.log({
    ukrainian: await locales.getString('uk-UA', 'hello.world'),    // ukrainian: Привіт, світ!
    english: await english.getString('en-US', 'hello.world')       // english: Hello, world!
});
```
