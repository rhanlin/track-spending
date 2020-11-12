<template>
  <Navbar :icon="Logo" />
  <div class="container w-full max-w-sm mx-auto mt-8 px-4 font-sans">
    <router-view v-show="!state.isLoading" />
  </div>
</template>
<script lang="ts">
import Logo from '/@/assets/img/logo-inverted.svg'
import Navbar from '/@/components/Navbar.vue'

import { useStore } from 'vuex'
import { State } from '../store'

export default {
  name: 'DefaultLayout',
  components: {
    Navbar,
  },
  setup() {
    const { state } = useStore<State>()
    return {
      Logo,
      state,
    }
  },
}
</script>
