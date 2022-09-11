import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import vuetify from './plugins/vuetify'

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(vuetify)
  .mount('#app')
