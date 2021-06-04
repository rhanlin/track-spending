import { GoogleSheetAPIResponse } from '../type/response'

export const setCategoryOptions = (val: GoogleSheetAPIResponse) => {
  localStorage.setItem('category', JSON.stringify(val))
}

export const getCategoryOptions = (): GoogleSheetAPIResponse | null => {
  const category = window.localStorage.getItem('category')
  if (category === null) return null

  const parsedCategory = JSON.parse(category)
  return parsedCategory
}
