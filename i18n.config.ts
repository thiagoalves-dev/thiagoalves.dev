import enUs from "~/data/lang/en-us";
import ptBr from "~/data/lang/pt-br";

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en-us',
    messages: {
        'en-us': enUs,
        'pt-br': ptBr
    }
}));