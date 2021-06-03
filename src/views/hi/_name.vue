<template>
  <form class="m-auto rounded-lg px-8 pt-6 pb-8 overflow-y-auto">
    <div class="mb-4">
      <Text
        tag="h3"
        size="xl"
        class="text-center mx-auto mb-8 dark:text-white font-bold"
      >
        {{ 'Hi !, ' + name }}
      </Text>
      <Input title="日期" type="date" v-model:value="form.date" />
      <Input
        title="金額"
        type="number"
        text-type="number"
        v-model:value="form.cost"
      />
      <Select
        title="分類"
        :selectOptions="parent_options"
        v-model:value="form.kind_parent"
      />
      <Select
        title="子分類"
        :selectOptions="child_options"
        v-model:value="form.kind_child"
      />
      <Textarea title="remark" v-model:value="form.remark" />
    </div>
    <Toast
      v-if="toast.isShow"
      v-bind="toast"
      @update:closeToast="toast.isShow = false"
    />
  </form>
</template>

<script lang="ts">
import {
  onMounted,
  reactive,
  toRefs,
  defineComponent,
  watchEffect,
  onUnmounted,
} from 'vue'
import { useRouter } from 'vue-router'
import { getData, postData } from '../../api/fetchApi'
import { useState } from '../../store/index'
import bus from '../../bus'

const defaultDay = new Date().toISOString().split('T')[0]
const GOOGLE_SHEET_URL =
  'https://script.google.com/macros/s/AKfycbxgyM5XPLleto9N400wDAGO3Q8SJRuB48ZKmqsK/exec'

type Content = {
  name: string
  content: Array<keyof GoogleSheetAPIResponse>
}

interface GoogleSheetAPIResponse {
  // [key: string]: Content
  food: Content
  communication: Content
  entertainment: Content
  gift: Content
  home: Content
  insurance: Content
  medical: Content
  other: Content
  'self-invest': Content
  traffic: Content
}

interface HomepageState {
  form: {
    name: string | ''
    date: string
    cost: number
    kind_parent: keyof GoogleSheetAPIResponse | ''
    kind_child: keyof GoogleSheetAPIResponse | ''
    remark: string
  }
  parent_options: SelectOption<keyof GoogleSheetAPIResponse>[]
  child_options: SelectOption<keyof GoogleSheetAPIResponse>[]
  optionData: GoogleSheetAPIResponse
  toast: {
    isShow: boolean
    message: string
    isError: boolean
  }
}

type SelectOption<T> = {
  value: T
  label: string
}

export default defineComponent({
  name: 'index',
  setup(props, { attrs }) {
    const state = useState()
    function updateLoadingState(val: boolean) {
      state.updateLoading(val)
    }
    const router = useRouter()
    const data: HomepageState = reactive({
      form: {
        name: typeof attrs.name === 'string' ? attrs.name : '',
        date: defaultDay,
        cost: 0,
        kind_parent: '',
        kind_child: '',
        remark: '',
      },
      parent_options: [],
      child_options: [],
      optionData: {
        food: {
          name: '',
          content: [],
        },
        communication: {
          name: '',
          content: [],
        },
        entertainment: {
          name: '',
          content: [],
        },
        gift: {
          name: '',
          content: [],
        },
        home: {
          name: '',
          content: [],
        },
        insurance: {
          name: '',
          content: [],
        },
        medical: {
          name: '',
          content: [],
        },
        other: {
          name: '',
          content: [],
        },
        'self-invest': {
          name: '',
          content: [],
        },
        traffic: {
          name: '',
          content: [],
        },
      },
      toast: {
        isShow: false,
        message: '',
        isError: false,
      },
    })
    const methods = {
      submit() {
        updateLoadingState(true)

        postData(GOOGLE_SHEET_URL, data.form)
          .then(response => {
            // reset
            data.form = {
              name: response.name,
              date: defaultDay,
              cost: 0,
              kind_parent: data.parent_options[0].value,
              kind_child: '',
              remark: '',
            }
          })
          .then(() => {
            updateLoadingState(false)
            data.toast = {
              message: '成功記帳囉！',
              isShow: true,
              isError: false,
            }
          })
          .catch(() => {
            updateLoadingState(false)
            data.toast = {
              message: '出現異常，請稍後再試',
              isShow: true,
              isError: true,
            }
          })
      },
      updateChildOptions(val: keyof GoogleSheetAPIResponse) {
        // console.log('val', val)
        const currentChildOptions = data.optionData[val].content
        data.child_options = currentChildOptions.map(item => ({
          value: item,
          label: item,
        }))
        data.form.kind_child = data.child_options[0].value
      },
    }
    const stopWatchEffect = watchEffect(() => {
      // watchEffect 回傳一個停止監聽的函式
      if (data.form.kind_parent)
        methods.updateChildOptions(data.form.kind_parent)
    })
    bus.on('submit:form', () => {
      methods.submit()
    })
    onMounted(() => {
      const userName = state.userName
      if (!userName) router.push('/')
      updateLoadingState(true)
      getData(`${GOOGLE_SHEET_URL}?queryType=type`)
        .then((response: GoogleSheetAPIResponse) => {
          data.optionData = response

          for (let key in response) {
            const keyWithType = key as keyof GoogleSheetAPIResponse
            data.parent_options = [
              ...data.parent_options,
              {
                value: keyWithType,
                label: response[keyWithType].name,
              },
            ]
          }
        })
        .then(() => {
          updateLoadingState(false)
          data.form.kind_parent = data.parent_options[0].value
        })
    })
    onUnmounted(() => {
      stopWatchEffect()
    })
    return {
      ...toRefs(data),
      ...methods,
      name: state.userName,
    }
  },
})
</script>
