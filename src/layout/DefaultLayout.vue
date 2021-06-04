<template>
  <div class="relative h-screen w-full text-gray-700 dark:text-gray-200">
    <Loading :isLoading="state.loading" />
    <Navigation :isOpen="navIsOpen" @logout="back" @close="navIsOpen = false" />
    <router-view class="view" />
    <Footer @update:isOpen="navIsOpen = !navIsOpen" />
  </div>
</template>
<script lang="ts">
import { defineComponent, watch, computed, ref } from 'vue'
import { useState, ThemeMode } from '../store/index'
import { useRouter } from 'vue-router'
import Loading from '/~/components/Loading.vue'
import Navigation from '/~/components/Navigation.vue'
import Footer from '/~/components/Footer.vue'

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    Loading,
    Navigation,
    Footer,
  },
  setup() {
    console.log(2)

    const state = useState()
    const router = useRouter()

    const isDark = computed(() =>
      state.colorMode === ThemeMode.dark ? true : false,
    )
    watch(
      isDark,
      (v: boolean) => {
        // console.log('theme mode', isDark.value)
        document.documentElement.classList.toggle('dark', v)
      },
      {
        immediate: true,
      },
    )

    const navIsOpen = ref(false)

    function back() {
      state.logout()
      router.push('/')
      navIsOpen.value = !navIsOpen.value
    }

    return {
      state,
      back,
      navIsOpen,
    }
  },
})
</script>
