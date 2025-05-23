import enUs from "./languages/en-us";
import ptBr from "./languages/pt-br";

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en-us',
    messages: {
        'en-us': enUs,
        'pt-br': ptBr
    }
}));
