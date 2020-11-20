import { createStore, ActionContext } from 'vuex'

export interface State {
  isLoading: boolean
  isDark: boolean
}

export default createStore<State>({
  state: {
    isLoading: false,
    isDark: true,
  },
  actions: {
    onSetIsLoading: (context: ActionContext, isLoading: boolean) => {
      context.commit('setIsLoading', isLoading)
    },
    onSetColorSchema: (context: ActionContext, isDark: boolean) => {
      context.commit('setColorSchema', isDark)
    },
  },
  mutations: {
    setIsLoading(state: State, isLoading: boolean) {
      state.isLoading = isLoading
    },
    setColorSchema(state: State, isDark: boolean) {
      state.isDark = isDark
    },
  },
})
