import { createPinia } from 'pinia'
import { createApp } from 'vue'
import './style.css'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'


const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)


app.mount('#app')