<template>
  <div
    class="basic-textarea mb-4"
    :data-is-disabled="isDisabled"
    :data-is-error="isError"
  >
    <label class="block text-gray-500 font-medium text-sm mb-2">
      {{ title }}
    </label>
    <textarea
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
      :rows="rows"
      :cols="50"
      :value="value"
      :placeholder="placeholder"
      :resize="resize"
      @input="updateValue"
      @keyup.enter="keyupEnterEvent"
    />
  </div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Textarea',
  props: {
    value: {
      type: String,
      default: () => {
        return ''
      },
    },
    title: {
      type: String,
      default: '',
    },
    isDisabled: {
      type: Boolean,
      default: () => {
        return false
      },
    },
    isError: {
      type: Boolean,
      default: () => {
        return false
      },
    },
    resize: {
      type: String,
      default: () => {
        return 'none'
      },
    },
    textType: {
      type: String,
      default: 'default',
    },
    placeholder: {
      type: String,
      default: '',
    },
    rows: {
      type: Number,
      default: 3,
    },
  },
  setup(props, { emit }) {
    const methods = {
      updateValue($event) {
        // const value = e.target.value
        if (props.textType === 'number') {
          $event.target.value = $event.target.value.replace(/[^0-9]+/g, '')
        }
        if (props.textType === 'english') {
          $event.target.value = $event.target.value.replace(/[^A-Za-z ]/g, '')
        }
        if (props.textType === 'english-number') {
          $event.target.value = $event.target.value.replace(/[^A-Za-z0-9]/g, '')
        }
        // console.log(value.target.value)
        emit('update:value', $event.target.value)
      },
      keyupEnterEvent() {
        emit('enter')
      },
    }

    return {
      ...methods,
    }
  },
})
</script>
