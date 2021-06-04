import { reactive, provide, inject } from 'vue'
import { getUserName, logout } from '../util/user'
import { setCategoryOptions, getCategoryOptions } from '../util/category'
import { GoogleSheetAPIResponse } from '../type/response'

export enum ThemeMode {
  // eslint-disable-next-line no-unused-vars
  dark = 'dark',
  // eslint-disable-next-line no-unused-vars
  light = 'light',
}

export class State {
  private loading = false
  public colorMode = ThemeMode.dark
  public userName = getUserName() ?? ''
  public optionData = getCategoryOptions()

  updateLoading(val: boolean) {
    this.loading = val
  }
  updateColorMode(mode: ThemeMode) {
    this.colorMode = mode
  }
  updateUserName(val: string) {
    this.userName = val
  }
  updateOptionData(val: GoogleSheetAPIResponse) {
    console.log(1), setCategoryOptions(val)
    this.optionData = val
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
