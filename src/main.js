import { createPinia } from '../node_modules/pinia/index'
import { createApp } from '../node_modules/vue/index'

import App from './App.vue'
import router from './router/index.js'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
