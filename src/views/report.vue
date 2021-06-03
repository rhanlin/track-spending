<template>
  <form class="pt-6 px-2 pb-8 overflow-y-auto grid grid-cols-12 gap-6">
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
          class="col-span-3 text-center mb-2 dark:text-white font-bold"
        >
          {{ col }}
        </Text>
      </div>
      <Record
        v-for="(item, index) in record"
        :key="index"
        :rowData="item.rowData"
        :note="item.note"
      />
    </div>
    <!-- <Toast
      v-if="toast.isShow"
      v-bind="toast"
      @update:closeToast="toast.isShow = false"
    /> -->
  </form>
</template>

<script lang="ts">
import { onMounted, defineComponent, reactive, toRefs } from 'vue'
import { useState } from '../store/index'
import { useRouter } from 'vue-router'
import { postData } from '../api/fetchApi'
import Record from '../components/form/Record.vue'
const GOOGLE_SHEET_URL =
  'https://script.google.com/macros/s/AKfycbxgyM5XPLleto9N400wDAGO3Q8SJRuB48ZKmqsK/exec'
interface ReportPageState {
  year: string
  month: string
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
      year: '',
      month: '',
      record: null,
      columns: ['日期', '大分類', '小分類', '花費'],
    })
    const init = () => {
      const userName = state.userName
      if (!userName) router.push('/')
      updateLoadingState(true)

      const queryBody = {
        name: userName,
        // year: new Date().getFullYear(),
        // month: new Date().getMonth() + 1,
        year: 2020,
        month: 11,
      }
      postData(`${GOOGLE_SHEET_URL}?queryType=record`, queryBody)
        .then((response: any) => {
          console.log(response)
          const { year, month, record } = response
          data.year = year
          data.month = month
          data.record = record.map(item => ({
            rowData: [
              item.date,
              item.bigCategory,
              item.smallCategory,
              item.spend,
            ],
            note: item.note,
          }))
        })
        .then(() => {
          updateLoadingState(false)
        })
    }

    onMounted(() => {
      init()
    })

    return {
      ...toRefs(data),
    }
  },
})
</script>
