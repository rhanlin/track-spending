<template>
  <div
    v-if="isLoading"
    class="w-full h-full fixed top-0 left-0 bg-gray-700 opacity-85 z-50 flex"
  >
    <div class="opacity-75 m-auto relative">
      <Icon name="loading" class="animate-spin h-10 w-10" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
