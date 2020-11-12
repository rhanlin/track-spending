import { createStore, ActionContext } from 'vuex'

export interface State {
  isLoading: boolean
}

export default createStore<State>({
  state: {
    isLoading: false,
  },
  actions: {
    onSetIsLoading: (context: ActionContext, isLoading: boolean) => {
      context.commit('setIsLoading', isLoading)
    },
  },
  mutations: {
    setIsLoading(state: State, isLoading: boolean) {
      state.isLoading = isLoading
    },
  },
})
