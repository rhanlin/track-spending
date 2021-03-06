<template>
  <div
    class="m-auto rounded-lg px-4 pt-6 pb-8 overflow-y-auto h-screen flex flex-col justify-center grid grid-cols-12 gap-6"
  >
    <div class="mb-4 col-span-12">
      <Text
        tag="h3"
        size="xl"
        class="text-center mx-auto mb-8 dark:text-white font-bold"
      >
        本月消費紀錄
      </Text>
      <div class="grid grid-cols-12 gap-6">
        <Text
          v-for="col in columns"
          :key="col"
          tag="h3"
          size="base"
          class="multiline-ellipsis col-span-3 text-center mb-2 dark:text-white font-bold"
        >
          {{ col }}
        </Text>
      </div>
      <template v-if="record.length">
        <Record
          v-for="(item, index) in record"
          :key="index"
          :rowData="item.rowData"
          :note="item.note"
          :isNegative="item.isNegative"
        />
      </template>
      <template v-else>
        <div class="my-auto py-8">
          <Text
            tag="h3"
            size="sm"
            class="text-center mx-auto dark:text-white font-bold"
          >
            目前沒有任何紀錄
          </Text>
        </div>
      </template>

      <div class="mt-8 flex items-baseline justify-end">
        <Text tag="h5" size="base" class="text-center mr-3 dark:text-gray-300">
          花費總計:
        </Text>
        <Text
          tag="h3"
          size="4xl"
          class="text-center font-bold"
          :class="counter <= 0 ? 'text-red-600' : 'text-blue-600'"
        >
          {{ counter }}
        </Text>
      </div>
    </div>
    <!-- <Toast
      v-if="toast.isShow"
      v-bind="toast"
      @update:closeToast="toast.isShow = false"
    /> -->
  </div>
</template>

<script lang="ts">
import { onMounted, defineComponent, reactive, toRefs } from 'vue'
import { useState } from '../store/index'
import { useRouter } from 'vue-router'
import { postData } from '../api/fetchApi'
import Record from '../components/form/Record.vue'
import {
  GoogleSheetAPIRecordResponse,
  GoogleSheetAPIResponse,
} from '../type/response'
import bus from '../bus'
const GOOGLE_SHEET_URL =
  'https://script.google.com/macros/s/AKfycbxgyM5XPLleto9N400wDAGO3Q8SJRuB48ZKmqsK/exec'
interface ReportPageState {
  year: number
  month: number
  counter: number
  record: any
  columns: string[]
}
export default defineComponent({
  components: { Record },
  setup() {
    const state = useState()
    const router = useRouter()
    const updateLoadingState = (val: boolean) => {
      state.updateLoading(val)
    }
    const data: ReportPageState = reactive({
      year: 0,
      month: 0,
      counter: 0,
      record: [],
      columns: ['日期', '大分類', '小分類', '金額'],
    })
    const bigCategoryHandler = (val: keyof GoogleSheetAPIResponse) => {
      const keys = Object.keys(state.optionData!)
      const currentKey = keys.find(key => key === val) as
        | keyof GoogleSheetAPIResponse
        | undefined
      if (!currentKey) return '查無類別'

      return state.optionData![currentKey].name
    }
    const init = () => {
      const userName = state.userName
      if (!userName) router.push('/')
      updateLoadingState(true)

      const queryBody = {
        name: userName,
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
      }
      postData(`${GOOGLE_SHEET_URL}?queryType=record`, queryBody)
        .then((response: GoogleSheetAPIRecordResponse) => {
          console.log(response)
          const { year, month, record } = response
          data.year = year
          data.month = month
          data.record = record.map(item => ({
            rowData: [
              item.date,
              bigCategoryHandler(
                item.bigCategory as keyof GoogleSheetAPIResponse,
              ),
              item.smallCategory,
              Math.abs(item.spend),
            ],
            note: item.note,
            isNegative: Boolean(Number(item.spend) <= 0),
          }))
          data.counter = record.reduce((accumulate, current) => {
            accumulate += current.spend
            return accumulate
          }, 0)
        })
        .then(() => {
          updateLoadingState(false)
        })
        .catch(error => {
          console.log('fail to fetch report data', error)
        })
    }
    bus.on('go:_name', () => {
      const userName = state.userName
      router.push(`/hi/${userName}`)
    })

    onMounted(() => {
      init()
    })

    return {
      ...toRefs(data),
    }
  },
})
</script>
