export const getUserName = (): string | null => localStorage.getItem('user')
export const logout = (): void => localStorage.clear()
