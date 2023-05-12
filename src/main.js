import { createPinia } from '../node_modules/pinia'
import { createApp } from '../node_modules/vue'

import App from './App.vue'
import router from './router/index.js'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
