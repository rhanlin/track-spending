<template>
  <p class="text-red-500 text-xs italic">{{ errorMessage }}</p>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Error',
  props: {
    errorMessage: {
      type: String,
      default: '',
    },
  },
})
</script>
