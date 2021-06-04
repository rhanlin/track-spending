export const getUserName = (): string | null => localStorage.getItem('user')
export const setUserName = (val: string) => localStorage.setItem('user', val)

export const logout = (): void => localStorage.clear()
