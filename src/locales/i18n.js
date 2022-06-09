import { createI18n } from 'vue-i18n'
import en from "./en.json"
import uz from "./uz.json"
import ru from "./ru.json"

const i18n = createI18n({
    locale: "en",
    messages:{
        en,
        uz,
        ru,
    }
})

export default i18n;