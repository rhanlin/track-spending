import { reactive, provide, inject } from 'vue'

export enum ThemeMode {
  dark = 'dark',
  light = 'light',
}

export class State {
  private loading = false
  public colorMode = ThemeMode.dark
  updateLoading(val: boolean) {
    this.loading = val
  }
  updateColorMode(mode: ThemeMode) {
    this.colorMode = mode
  }
}

export const stateSymbol = Symbol('state')
export const createState = () => {
  return reactive(new State())
}

export const useState = () => inject(stateSymbol) as State
export const provideState = () => provide(stateSymbol, createState())
