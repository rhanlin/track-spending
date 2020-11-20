<template>
  <div
    ref="el"
    class="bg-contain bg-no-repeat bg-center"
    :class="$attrs.class"
    :style="update"
  >
    <!-- <svg><use :xlink:href="`#${name}`" /></svg> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { State } from '../../store'
export default defineComponent({
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const { state } = useStore<State>()

    const update = computed(() => {
      return `
        background-image: url(/~/assets/img/${props.name}.svg);
        filter: invert(${state.isDark ? 1 : 0});
      `
    })
    return {
      update,
    }
  },
})
</script>
