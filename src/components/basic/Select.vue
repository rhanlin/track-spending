<template>
  <div
    class="basic-select mb-4"
    :data-is-disabled="isDisabled"
    :data-is-error="isError"
  >
    <label class="block text-gray-500 font-medium text-sm mb-2">
      {{ title }}
    </label>
    <div class="inline-block relative w-full">
      <select
        class="
        appearance-none 
        border-2 
        rounded 
        w-full 
        py-2 
        px-4 
        leading-tight 
        bg-gray-200 
        text-gray-700 
        border-gray-200 
        focus:outline-none 
        focus:bg-white 
        focus:border-purple-500
        "
        v-bind="$attrs"
        :value="value"
        @input="e => $emit('update:value', e.target.value)"
      >
        <option
          v-for="item in selectOptions"
          :key="item[valueKey]"
          :value="item[valueKey]"
          >{{ item[label] }}
        </option>
      </select>
      <div
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
      >
        <svg
          class="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, defineComponent } from 'vue'
export default defineComponent({
  name: 'Select',
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isError: {
      type: Boolean,
      default: false,
    },
    selectOptions: {
      type: Array,
      default: () => {
        return []
      },
    },
    valueKey: {
      type: String,
      default: 'value',
    },
    label: {
      type: String,
      default: 'label',
    },
  },
  setup(props) {
    const state = reactive({
      fullValue: props.value,
    })
    // const methods = {
    //   emitHandler(e) {
    //     console.log(e.target.value)
    //     emit('update:value', e.target.value)
    //   },
    // }

    return {
      state,
      // ...methods,
    }
  },
})
</script>
