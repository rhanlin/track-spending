export interface postBody {
  name: string
  date?: string
  cost?: number
  kind_parent?: string
  kind_child?: string
  remark?: string
  year?: number
  month?: number
}

export const getData = async (url: string) => {
  try {
    const response = await fetch(url)
    const { type } = await response.json()
    // console.log('type', type)
    return type
  } catch (error) {
    throw new Error(`fetch google api fail:>>> ${error}`)
  }
}

export const postData = async (url: string, body: postBody) => {
  try {
    const Options = {
      method: 'POST',
      body: JSON.stringify(body),
    }
    const response = await fetch(url, Options)
    const { data } = await response.json()

    return data
  } catch (error) {
    throw new Error(`fetch google api fail:>>> ${error}`)
  }
}
