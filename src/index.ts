// import LocaleManager from "./managers/LocaleManager.js";
import Locales from "./managers/Locales.js";

// export default{
//     LocaleManager,
//     Locales,
// }


import { fileURLToPath } from 'url';
const __dirname = fileURLToPath(new URL('.', import.meta.url));


(async ()=>{
    const locales = new Locales("file://"+__dirname+"/locales/");
    // locales.setPath("file://"+__dirname+"locales/");
    
    const ukrainian = await locales.getLocale('uk-UA');
    const english = await locales.getLocale('uk-UA');

    console.log({
        ukrainian: ukrainian,
        english: english
    });
})();