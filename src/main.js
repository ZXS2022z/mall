import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from './stores/index'
import { LazyLoadPlugin } from './directives'

const app = createApp(App)

app.use(LazyLoadPlugin)
app.use(pinia)
app.use(router)
app.mount('#app')
