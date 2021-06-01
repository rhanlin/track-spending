<template>
  <div v-show="isOpen" class="fixed flex flex-wrap w-2/3 h-screen z-10">
    <div class="w-full dark:bg-gray-700 bg-gray-200 rounded p-3 shadow-lg">
      <div class="flex items-center space-x-4 p-2 mb-5">
        <Icon name="default-user" class="h-12 w-12 " />
        <div>
          <Text
            tag="h4"
            size="lg"
            class="font-semibold text-lg dark:text-white text-white-700 capitalize font-poppins tracking-wide"
          >
            {{ state.userName }}
          </Text>
        </div>
      </div>
      <ul v-if="Boolean(state.userName)" class="space-y-2 text-sm">
        <li>
          <button
            class="flex 
            w-full
            items-center 
            space-x-3 
            text-gray-700
            p-2 
            rounded-md 
            focus:bg-gray-200"
            @click="goMainPage"
          >
            <span>
              <Icon name="home" class="h-7 w-7 m-auto" />
            </span>
            <Text
              tag="h1"
              size="xl"
              class="text-center mx-auto font-bold dark:text-white text-white-700"
            >
              首頁
            </Text>
          </button>
        </li>
        <li>
          <button
            class="flex 
            w-full
            items-center 
            space-x-3 
            text-gray-700
            p-2 
            rounded-md 
            focus:bg-gray-200"
            @click="upadteColorMode(state.colorMode)"
          >
            <span>
              <Icon :name="state.colorMode" class="h-7 w-7 m-auto" />
            </span>
            <Text
              tag="h1"
              size="xl"
              class="text-center mx-auto font-bold dark:text-white text-white-700"
            >
              {{ colorModeTitle }}
            </Text>
          </button>
        </li>
        <li>
          <button
            class="flex
            w-full
            items-center 
            space-x-3 
            text-gray-700
            p-2 
            rounded-md 
            focus:bg-gray-200"
            @click="$emit('logout')"
          >
            <span>
              <Icon name="logout" class="h-7 w-7 m-auto" />
            </span>
            <Text
              tag="h1"
              size="xl"
              class="text-center mx-auto font-bold dark:text-white text-white-700"
            >
              登出
            </Text>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useState, ThemeMode } from '../store/index'

export default defineComponent({
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const state = useState()
    const router = useRouter()

    const goMainPage = () => {
      const userName = state.userName
      if (userName) router.push(`/hi/${userName}`)

      emit('close')
    }

    const upadteColorMode = (mode: ThemeMode) => {
      if (mode === ThemeMode.dark) {
        state.updateColorMode(ThemeMode.light)
      } else {
        state.updateColorMode(ThemeMode.dark)
      }

      emit('close')
    }

    const colorModeTitle = computed(() => {
      return `${
        state.colorMode === ThemeMode.dark ? '切為亮色系' : '切為暗色系'
      }`
    })

    return {
      state,
      goMainPage,
      upadteColorMode,
      colorModeTitle,
    }
  },
})
</script>
