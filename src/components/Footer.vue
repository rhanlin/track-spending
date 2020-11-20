<template>
  <div
    class="text-xl mt-6 fixed inset-x-0 bottom-0 z-10 py-3 flex text-center dark:bg-gray-700 bg-gray-200 "
  >
    <button
      class="icon-btn mx-2 flex-1 focus:outline-none text-white font-bold"
      @click="changeColor(isDark)"
    >
      <Icon :name="isDark ? 'light' : 'dark'" class="h-7 w-7 m-auto" />
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
import { computed } from 'vue'
import { useStore } from 'vuex'
import { State } from '../store'
import { useRouter } from 'vue-router'
import bus from '../bus'
export default {
  setup() {
    const { state, dispatch } = useStore<State>()
    const isDark = computed(() => state.isDark)
    const router = useRouter()
    function back() {
      localStorage.clear()
      router.push('/')
    }
    function changeColor(isDark: boolean) {
      dispatch('onSetColorSchema', !isDark)
    }
    function busSubmit($route: any) {
      // console.log('route', $route.name)
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
      isDark,
      back,
      changeColor,
      busSubmit,
    }
  },
}
</script>
