import 'uno.css'
import 'vfonts/FiraCode.css'
import '@/assets/var.scss'

import App from './App.vue'
import { createApp } from 'vue'
import naive from 'naive-ui'
import router from './router'

const app = createApp(App)
app.use(naive).use(router).mount('#app')
