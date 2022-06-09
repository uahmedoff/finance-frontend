import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from './locales/i18n'
import BootstrapVue3 from 'bootstrap-vue-3'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(i18n)
app.use(router)
app.use(BootstrapVue3)
app.mount('#app')
