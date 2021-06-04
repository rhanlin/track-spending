type CategoryContent = {
  name: string
  content: Array<keyof GoogleSheetAPIResponse>
}

type RecordContent = {
  bigCategory: string
  date: string
  note: string
  smallCategory: string
  spend: number
}

export interface GoogleSheetAPIResponse {
  // [key: string]: CategoryContent
  food: CategoryContent
  communication: CategoryContent
  entertainment: CategoryContent
  gift: CategoryContent
  home: CategoryContent
  insurance: CategoryContent
  medical: CategoryContent
  other: CategoryContent
  'self-invest': CategoryContent
  traffic: CategoryContent
  income: CategoryContent
}

export interface GoogleSheetAPIRecordResponse {
  year: number
  month: number
  record: RecordContent[]
}
