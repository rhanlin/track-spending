<template>
  <div
    ref="el"
    class="bg-contain bg-no-repeat bg-center"
    :class="$attrs.class"
    :style="update"
  />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useState, ThemeMode } from '../../store/index'

export default defineComponent({
  name: 'Icon',
  props: {
    name: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const state = useState()
    const update = computed(() => {
      return `
        background-image: url(../img/${props.name}.svg);
        filter: invert(${state.colorMode === ThemeMode.dark ? 1 : 0});
      `
    })
    return {
      update,
    }
  },
})
</script>
