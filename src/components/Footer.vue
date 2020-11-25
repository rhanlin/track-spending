<template>
  <div
    class="text-xl mt-6 fixed inset-x-0 bottom-0 z-10 py-3 flex text-center dark:bg-gray-700 bg-gray-200 "
  >
    <button
      class="icon-btn mx-2 flex-1 focus:outline-none text-white font-bold"
      @click="upadte(state.colorMode)"
    >
      <Icon :name="state.colorMode" class="h-7 w-7 m-auto" />
    </button>
    <button
      class="icon-btn mx-2 flex-1 focus:outline-none dark:text-white text-black font-bold "
      type="button"
      @click="busSubmit($route)"
    >
      Go!
    </button>
    <button
      class="icon-btn mx-2 flex-1 focus:outline-none text-white font-bold"
      @click="back"
    >
      <Icon name="logout" class="h-7 w-7 m-auto" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useState, ThemeMode } from '../store/index'
import { useRouter } from 'vue-router'
import bus from '../bus'

export default defineComponent({
  setup() {
    const state = useState()
    const router = useRouter()

    const upadte = (mode: ThemeMode) => {
      if (mode === ThemeMode.dark) {
        state.updateColorMode(ThemeMode.light)
      } else {
        state.updateColorMode(ThemeMode.dark)
      }
    }

    function back() {
      localStorage.clear()
      router.push('/')
    }

    function busSubmit($route: any) {
      const routeName = $route.name
      switch (routeName) {
        case 'index':
          bus.emit('submit:name')
          break
        case '_name':
          bus.emit('submit:form')
          break
      }
    }

    return {
      state,
      back,
      upadte,
      busSubmit,
    }
  },
})
</script>
