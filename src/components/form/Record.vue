<template>
  <div
    class="
      border-b border-clc-black border-opacity-25
      w-full py-2
    "
  >
    <div class="grid grid-cols-12 gap-6 ">
      <Text
        v-for="row in rowData"
        :key="row"
        tag="p"
        size="sm"
        class="multiline-ellipsis
        col-span-3 text-center dark:text-white"
      >
        {{ row }}
      </Text>
    </div>
  </div>
</template>

<script lang="ts">
/**
 * @author Spencer.Lin 2021-04-08
 * @description description
 *
 * @summary summary
 */
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FormRecord',
  props: {
    rowData: {
      type: Array,
      default: () => {
        return []
      },
    },
    note: {
      type: String,
      default: '',
    },
  },
})
</script>
