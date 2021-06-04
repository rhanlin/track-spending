<template>
  <div
    class="m-auto rounded-lg px-8 pt-6 pb-8 overflow-y-auto h-screen flex flex-col justify-center"
  >
    <Icon name="home" class="h-10 w-10" />
    <p>
      <a href="https://github.com/antfu/vitesse" target="_blank">
        記帳管理
      </a>
    </p>
    <p class="text-sm opacity-50">
      <em> 不勞而得之財必然消耗，勤勞積蓄的必見加增。<br />(箴言13:11) </em>
    </p>

    <div class="py-4" />

    <input
      v-model="name"
      placeholder="請輸入名字"
      class="px-4 py-2 border border-gray-200 rounded text-center text-sm outline-none active:outline-none bg-transparent dark:border-gray-700"
      style="width: 100%"
      @keydown.enter="go"
    />
    <Text
      tag="p"
      size="xs"
      class="text-center mx-auto mt-4 px-3 dark:text-white"
    >
      {{ `版本: ${version}` }}
    </Text>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useState } from '../store/index'
import { version } from '../../package.json'
import bus from '../bus'

export default defineComponent({
  setup() {
    const state = useState()

    const router = useRouter()
    const name = ref('')
    const go = () => {
      if (name.value) {
        router.push(`/hi/${name.value}`)
        state.updateUserName(name.value)
      }
    }
    bus.on('submit:name', () => go())
    onMounted(() => {
      const userName = state.userName
      if (userName) router.push(`/hi/${userName}`)
    })

    return {
      version,
      name,
      go,
    }
  },
})
</script>
