import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import 'normalize-css'
import './index.css'
import globalComponents from './components'
const app = createApp(App)

app.use(store)
app.use(router)

// Global components registered
const globalComponentsKeys: string[] = Object.keys(globalComponents)
const keysLength: number = globalComponentsKeys.length
for (let i = 0; i < keysLength; i++) {
  app.component(
    globalComponentsKeys[i],
    globalComponents[globalComponentsKeys[i]],
  )
}
// app.use

app.mount('#app')
