import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from './utils/i18n'
import BootstrapVue3 from 'bootstrap-vue-3'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

import Echo from 'laravel-echo';
import Pusher from 'pusher-js'

window.Pusher = Pusher;

let tkn = (localStorage.getItem('accessToken')) ? $.parseJSON(localStorage.getItem('accessToken')).token : null;
window.Echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_APP_MIX_PUSHER_APP_KEY,
    // cluster: import.meta.env.VITE_APP_MIX_PUSHER_APP_CLUSTER,
    wsHost: import.meta.env.VITE_APP_MIX_WEBSOCKETS_SERVER,
    wsPort: 6001,
    wssPort: 6001,
    forceTLS: false,
    disableStats: true,
    enabledTransports: ['ws', 'wss'],
    auth: {
        headers: {
            Authorization: 'Bearer ' + tkn,
        },
    },
});

app.use(createPinia())
app.use(i18n)
app.use(router)
app.use(BootstrapVue3)
app.component('Datepicker', Datepicker)
app.mount('#app')
