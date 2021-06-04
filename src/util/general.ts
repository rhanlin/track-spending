import { setUserName, getUserName } from './user'

export const vueConsole = (target: string, value: string): void => {
  console.log(
    `%c ${target} %c ${value} `,
    'background:#35495e; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
    'background:#41b883; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
  )
}
export const getVersion = (): string | null =>
  window.localStorage.getItem('amwayLiveGoVersion')

export const updateStorageVersion = (version: string) => {
  const currentUserName = getUserName()
  window.localStorage.clear()
  if (currentUserName) {
    setUserName(currentUserName)
  }
  setVersion(version)
}

const setVersion = (version: string) => {
  window.localStorage.setItem('amwayLiveGoVersion', version)
}
