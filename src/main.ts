import './main.postcss'
import 'normalize-css'
import { createApp } from 'vue'
import App from './App.vue'
import { stateSymbol, createState } from './store/index'
import router from './router'
import globalComponents from './components'
import { version } from '../package.json'
import { vueConsole, getVersion, updateStorageVersion } from './util/general'

const initProject = async () => {
  vueConsole('version:', version)
  const userWebVersion = getVersion()
  if (!userWebVersion || userWebVersion !== version) {
    await updateStorageVersion(version)
  }
}

initProject().then(() => {
  const app = createApp(App)

  app.provide(stateSymbol, createState())
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
  app.mount('#app')
})
