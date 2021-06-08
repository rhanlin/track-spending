<template>
  <form
    class="m-auto rounded-lg px-4 pt-6 pb-8 overflow-y-auto
    h-screen flex flex-col justify-center"
  >
    <div class="mb-4">
      <Text
        tag="h3"
        size="xl"
        class="text-center mx-auto mb-8 dark:text-white font-bold"
      >
        {{ 'Hi !, ' + name }}
      </Text>
      <div>
        <Text
          tag="label"
          size="sm"
          class="block text-gray-500 font-medium text-sm mb-2"
        >
          日期
        </Text>
        <BasicInput type="date" v-model:value="form.date" />
      </div>
      <div>
        <Text
          tag="label"
          size="sm"
          class="block text-gray-500 font-medium text-sm mb-2"
          :color="form.isNegative ? 'text-red-600' : 'text-red-600'"
        >
          {{ `金額${form.isNegative ? '(支出)' : '(收入)'}` }}
        </Text>
        <BasicInput
          type="number"
          text-type="number"
          v-model:value="form.cost"
          class="col-span-4"
          :color="form.isNegative ? 'text-red-600' : 'text-blue-600'"
        >
          <template v-if="form.isNegative" v-slot:prefix="">
            <Text tag="label" size="sm" class="block text-red-600 text-sm ml-2">
              -
            </Text>
          </template>
          <template v-slot:suffix="">
            <button
              class="icon-btn px-3 py-1 mx-1 flex-1 rounded-lg
              focus:outline-none text-white font-bold"
              :class="form.isNegative ? 'bg-red-600' : 'bg-red-300'"
              type="button"
              @click.prevent="isNegativeHandler(true)"
            >
              —
            </button>
            <button
              class="icon-btn px-3 py-1 mx-1 mr-2 flex-1 rounded-lg 
              focus:outline-none text-white font-bold"
              :class="!form.isNegative ? 'bg-blue-600' : 'bg-blue-300'"
              type="button"
              @click.prevent="isNegativeHandler(false)"
            >
              ＋
            </button>
          </template>
        </BasicInput>
      </div>

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
      <Textarea title="註記" v-model:value="form.remark" />
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
import { postData } from '../../api/fetchApi'
import { useState } from '../../store/index'
import { GoogleSheetAPIResponse } from '../../type/response'
import bus from '../../bus'

const defaultDay = new Date().toISOString().split('T')[0]
const GOOGLE_SHEET_URL =
  'https://script.google.com/macros/s/AKfycbxgyM5XPLleto9N400wDAGO3Q8SJRuB48ZKmqsK/exec'

interface HomepageState {
  form: {
    name: string | ''
    date: string
    cost: number
    isNegative: boolean
    kind_parent: keyof GoogleSheetAPIResponse | ''
    kind_child: keyof GoogleSheetAPIResponse | ''
    remark: string
  }
  parent_options: SelectOption<keyof GoogleSheetAPIResponse>[]
  child_options: SelectOption<keyof GoogleSheetAPIResponse>[]
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
        isNegative: true, // 支出
        kind_parent: '',
        kind_child: '',
        remark: '',
      },
      parent_options: [],
      child_options: [],
      toast: {
        isShow: false,
        message: '',
        isError: false,
      },
    })
    const resetForm = (name: string) => {
      // reset
      data.form = {
        name: name,
        date: defaultDay,
        cost: 0,
        isNegative: true,
        kind_parent: data.parent_options[0].value,
        kind_child: '',
        remark: '',
      }
    }
    const methods = {
      submit() {
        if (data.form.cost === 0) return
        updateLoadingState(true)

        postData(GOOGLE_SHEET_URL, data.form)
          .then(response => {
            resetForm(response.name)
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
        const currentChildOptions = state.optionData![val].content
        data.child_options = currentChildOptions.map(item => ({
          value: item,
          label: item,
        }))
        data.form.kind_child = data.child_options[0].value
      },
      isNegativeHandler(val: boolean) {
        // 如果點擊收入，則自動將大分類改為最後一筆選項(收入)，相反則將其改為第一筆選項(飲食酒水)
        data.form.isNegative = val
        if (val) data.form.kind_parent = data.parent_options[0]?.value
        else
          data.form.kind_parent =
            data.parent_options[data.parent_options.length - 1]?.value
      },
    }
    const stopWatchEffect = watchEffect(() => {
      // watchEffect 回傳一個停止監聽的函式
      if (data.form.kind_parent) {
        methods.updateChildOptions(data.form.kind_parent)
      }
    })
    bus.on('submit:form', () => {
      methods.submit()
    })
    onMounted(() => {
      const userName = state.userName
      if (!userName) router.push('/')

      for (let key in state.optionData) {
        const keyWithType = key as keyof GoogleSheetAPIResponse
        data.parent_options = [
          ...data.parent_options,
          {
            value: keyWithType,
            label: state.optionData[keyWithType].name,
          },
        ]
      }
      data.form.kind_parent = data.parent_options[0].value
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
