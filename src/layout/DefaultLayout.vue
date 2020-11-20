<template>
  <div class="flex relative h-screen px-4 text-gray-700 dark:text-gray-200">
    <router-view class="view" v-show="!state.isLoading" />
    <Footer />
  </div>
</template>
<script lang="ts">
import { watch, computed } from 'vue'
import { useStore } from 'vuex'
import { State } from '../store'
import Footer from '/~/components/Footer.vue'
export default {
  name: 'DefaultLayout',
  components: {
    Footer,
  },
  setup() {
    const { state } = useStore<State>()
    const isDark = computed(() => state.isDark)
    watch(
      isDark,
      (v: boolean) => {
        console.log('theme mode', isDark.value)
        document.documentElement.classList.toggle('dark', v)
      },
      {
        immediate: true,
      },
    )
    return {
      state,
    }
  },
}
</script>
