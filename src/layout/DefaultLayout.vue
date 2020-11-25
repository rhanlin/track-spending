<template>
  <div class="flex relative h-screen px-4 text-gray-700 dark:text-gray-200">
    <Loading :isLoading="state.loading" />
    <router-view class="view" />
    <Footer />
  </div>
</template>
<script lang="ts">
import { defineComponent, watch, computed } from 'vue'
import { useState, ThemeMode } from '../store/index'
import Loading from '/~/components/Loading.vue'
import Footer from '/~/components/Footer.vue'

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    Loading,
    Footer,
  },
  setup() {
    const state = useState()
    const isDark = computed(() =>
      state.colorMode === ThemeMode.dark ? true : false,
    )
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
})
</script>
