import { reactive, provide, inject } from 'vue'
import { getUserName, logout } from '../util/user'

export enum ThemeMode {
  dark = 'dark',
  light = 'light',
}

export class State {
  private loading = false
  public colorMode = ThemeMode.dark
  public userName = getUserName() ?? ''

  updateLoading(val: boolean) {
    this.loading = val
  }
  updateColorMode(mode: ThemeMode) {
    this.colorMode = mode
  }
  updateUserName(val: string) {
    this.userName = val
  }

  logout() {
    this.userName = ''
    logout()
  }
}

export const stateSymbol = Symbol('state')
export const createState = () => {
  return reactive(new State())
}

export const useState = () => inject(stateSymbol) as State
export const provideState = () => provide(stateSymbol, createState())
