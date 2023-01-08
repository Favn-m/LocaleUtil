# LocaleUtil
Util to easily manage locales, working with json<br>
 `-` Easy to use utility to work with locales!<br>
 `-` Almost fully uses promises<br>
 `-` Supports object path*<br>
\*Will be explained below

## Initializing

First thing you will need is to create folder that will contain all locale files, let's say it will be `/locales/`<br>
Now lets create example json files, that will contain our translations with keys<br>
LocaleUtil supports 2 ways of defining keys, using usual `.` path:
```json
{
    "key.subkey":"translate",
    "hello.world":"Hello, world!",
    "hello.user":"Hello, {user}!"
}
```
or multi-object* path(example below):
```json
{
    "hello":{
        "world":"Hello, world!",
        "user":"Hello, {user}!"
    },
    "report":{
        "create":{
            "message":"Report message",
            "user":"Report user"
        },
        "delete":"Delete this report"
    },
    "this.util":"Supports both ways, you can combine them!"
}
```
They both support [replaceable-variables](#using-replaceable-variables), in examples above you can 

Language name is name of the json file, that holds translates for this language

Basically, there is 2 ways to interact with locales
## Get locale manager

Most often you will need to get many strings from single locale<br>
You can easily do it with LocaleUtil<br>
`<Locales>.getLocale(language: string)`, example:
```js
//Define path to the locales(starts from PROJECT directory)
const locales = new Locales({path: "./locales/"});

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
const locales = new Locales({path: "./locales/"});

console.log({
    ukrainian: await locales.getString('uk-UA', 'hello.world'),    // ukrainian: Привіт, світ!
    english: await english.getString('en-US', 'hello.world')       // english: Hello, world!
});
```

### Using replaceable-variables
Lets say we have this JSON as locale:
```json
{
    "hello.user":"\\{Hello}, {user}!",
    "welcome.user":"Welcome, {user}, to {server}!"
}
```
To parse variables we gave as `{}`, we need to add one more argument to `.getString()` function, it(argument) takes object that takes variable name(`user`, `server`) as key, and "to replace" as value, for example:
```js
const locales = new Locales({path: "./locales/"});

const english = locales.getLocale('en-US');

console.log({
    helloUkrainian: await locales.getString('uk-UA', 'hello.user', { user: 'Favn' }),    // helloUkrainian: Привіт, Favn!
    helloEnglish: await locales.getString('en-US', 'hello.user', { user: 'Favn' }),            // helloEnglish: {Hello}, Favn!
    welcomeEnglish: await english.getString('welcome.user', { 
        user: 'Favn',
        server: 'LocaleUtil support' 
    })                                                                                   // welcomeEnglish: Welcome, Favn, to LocaleUtil support!
});
```

### Getting all translates by key
Lets say we have translates for 10 languages, sometimes we will need to get all translates of one key, LocaleUtil allows us to do it!<br>
`<Locales>.getAllStrings(key: string, options?: object)` will return object with language name as key and translation as value
Note, that you can get all translates __only__ of cached files, I would highly recommend to add `fetchOnStart: true` as `Locales` option.
```js
const locales = new Locales({path: "./locales/", fetchOnStart: true});

locales.once('ready', ()=>{
    console.log(locales.getAllStrings('hello.user', { replace: { user: 'Favn' }})); //{ 'en-US': 'Welcome, Favn!', 'uk-UA': 'Привіт, Favn!', 'kz-KZ': 'Сәлем, Favn!' }
    console.log(locales.getAllStrings('hello.user', { exclude: ['en-US'], replace: { user: 'Favn' }})); //{ 'uk-UA': 'Привіт, Favn!', 'kz-KZ': 'Сәлем, Favn!' }
    console.log(locales.getAllStrings('hello.user', { include: ['uk-UA'], replace: { user: 'Favn' }})); //{ 'uk-UA': 'Привіт, Favn!' }
})
```
