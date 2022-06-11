import { createI18n } from 'vue-i18n'
import en from "@/locales/en.json"
import uz from "@/locales/uz.json"
import ru from "@/locales/ru.json"

const instance = createI18n({
    locale: "en",
    messages:{
        en,
        uz,
        ru,
    }
})

export default instance;

export const i18n = instance.global;