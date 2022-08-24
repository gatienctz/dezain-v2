import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

const pinia = createPinia()

loadFonts()

createApp(App)
  .use(pinia)
  .use(vuetify)
  .mount('#app')
