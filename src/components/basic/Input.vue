<template>
  <div
    class="basic-input mb-4"
    :data-is-disabled="isDisabled"
    :data-is-error="isError"
  >
    <label class="block text-gray-500 font-medium text-sm mb-2">
      {{ title }}
    </label>
    <input
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
      :type="type"
      :value="value"
      :maxlength="maxLength"
      :disabled="isDisabled"
      :placeholder="placeholder"
      @input="updateValue"
    />

    <div class="input__prefix"><slot name="prefix"></slot></div>
    <div class="input__suffix"><slot name="suffix"></slot></div>
    <Error v-if="isError" :error-message="errorMessage" />
  </div>
</template>

<script>
import Error from '../basic/Error.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Input',
  components: {
    Error,
  },
  props: {
    value: {
      type: [String, Number, Object, Array],
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    isError: {
      type: Boolean,
      default: () => {
        return false
      },
    },
    type: {
      type: String,
      default: 'text',
    },
    nativeName: {
      type: String,
      default: '',
    },
    readonly: {
      type: Boolean,
      default: () => {
        return false
      },
    },
    isDisabled: {
      type: Boolean,
      default: () => {
        return false
      },
    },
    min: {
      type: Number,
      default: () => {
        return 0
      },
    },
    max: {
      type: Number,
      default: () => {
        return 100
      },
    },
    placeholder: {
      type: String,
      default: () => {
        return ''
      },
    },
    maxLength: {
      type: Number,
      default: () => {
        return 100
      },
    },
    textType: {
      type: String,
      default: 'default',
    },
    isOnlyNumber: {
      type: Boolean,
      default: false,
    },
    hasPoint: {
      type: Boolean,
      default: true,
    },
    errorMessage: {
      type: String,
      default: '',
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
      keyPressEvent($event) {
        const keyCode = $event.keyCode ? $event.keyCode : $event.which
        if (this.isOnlyNumber) {
          // if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
          if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
            $event.preventDefault()
          }
        }
        if (!this.hasPoint) {
          if (keyCode === 46) {
            $event.preventDefault()
          }
        }
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
