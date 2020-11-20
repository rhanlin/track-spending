<template>
  <div class="m-auto">
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
  </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import bus from '../bus'
export default defineComponent({
  setup() {
    const router = useRouter()
    const name = ref('')
    const go = () => {
      if (name.value) {
        router.push(`/hi/${name.value}`)
        localStorage.setItem('user', name.value)
      }
    }
    bus.on('submit:name', () => go())
    onMounted(() => {
      const userName = localStorage.getItem('user')
      if (userName) router.push(`/hi/${userName}`)
    })

    return {
      name,
      go,
    }
  },
})
</script>
