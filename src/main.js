import { createPinia } from './pinia.js'
import { createApp } from './vue.js'

import App from './App.vue'
import router from './router/index.js'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
