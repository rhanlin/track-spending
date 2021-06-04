<template>
  <div
    class="basic-input mb-4"
    :data-is-disabled="isDisabled"
    :data-is-error="isError"
  >
    <input
      :class="
        `basic-input__text
        appearance-none 
        border-2 
        rounded 
        w-full 
        py-2 
        px-4 
        leading-tight 
        bg-gray-200
        border-gray-200 
        focus:outline-none 
        focus:bg-white 
        focus:border-purple-500
        ${color}`
      "
      :type="type"
      :value="value"
      :pattern="patternHandler"
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
import { defineComponent, computed } from 'vue'
export default defineComponent({
  name: 'BasicInput',
  components: {
    Error,
  },
  props: {
    value: {
      type: [String, Number, Object, Array],
      default: '',
    },
    color: {
      type: String,
      default: 'text-gray-700',
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
    const patternHandler = computed(() => {
      return `${props.type === 'number' ? '\\d*' : ''}`
    })

    return {
      ...methods,
      patternHandler,
    }
  },
})
</script>

<style scoped>
.basic-input {
  position: relative;
  width: 100%;
}
.input[data-is-disabled='true'] .input__text {
  border: none;
  pointer-events: none;
  background-color: rgba(0, 0, 0, 0.05);
  color: #bfbfbf;
}
.input[data-is-disabled='true'] .input__icon {
  display: none;
}
.input__prefix {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  left: 0;
  top: 0;
}
.input__suffix {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  right: 0;
  top: 0;
}
.input[data-is-error='true'] .input__text {
  border-color: var(--error);
  color: var(--error);
}
.input[data-is-error='true'] .input__text::placeholder {
  color: var(--error);
}
</style>
