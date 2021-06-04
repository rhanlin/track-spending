<template>
  <div v-if="inited">
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { getData } from './api/fetchApi'
import { useState } from './store/index'
const GOOGLE_SHEET_URL =
  'https://script.google.com/macros/s/AKfycbxgyM5XPLleto9N400wDAGO3Q8SJRuB48ZKmqsK/exec'
import { GoogleSheetAPIResponse } from './type/response'

export default defineComponent({
  setup() {
    console.log(0)
    const state = useState()
    const data = reactive({
      inited: false,
      isCategoryNull: !state.optionData,
    })

    if (data.isCategoryNull) {
      getData(`${GOOGLE_SHEET_URL}?queryType=type`).then(
        (response: GoogleSheetAPIResponse) => {
          console.log(1, response)
          state.updateOptionData(response)
          data.inited = true
        },
      )
    } else {
      data.inited = true
    }

    return {
      ...toRefs(data),
    }
  },
})
</script>
