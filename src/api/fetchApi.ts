import { useStore } from 'vuex'
import { State } from '../store'

export interface postBody {
  name: string
  date: string
  cost: number
  kind_parent: string
  kind_child: string
  remark: string
}

export const getData = async (url: string) => {
  const { dispatch } = useStore<State>()

  try {
    dispatch('onSetIsLoading', true)
    const response = await fetch(url)
    const { type } = await response.json()
    // console.log('type', type)
    return type
  } catch {
    throw new Error('fetch google api fail')
  }
}

export const postData = async (url: string, body: postBody) => {
  // const { dispatch } = useStore<State>()
  try {
    // dispatch('onSetIsLoading', true)
    // console.log('body', body)

    const Options = {
      method: 'POST',
      body: JSON.stringify(body),
    }
    const response = await fetch(url, Options)
    const { data } = await response.json()

    return data
  } catch {
    throw new Error('fetch google api fail')
  }
}
