<script>
import { h, defineComponent } from 'vue'
const SIZE_TYPES = [
  'xs',
  'sm',
  'base',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  '6xl',
]

export default defineComponent({
  name: 'Text',
  props: {
    tag: {
      type: String,
      default: 'p',
    },
    size: {
      type: String,
      required: true,
      validator: size => SIZE_TYPES.indexOf(size) !== -1,
    },
    idRequired: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    // console.log(slots, attrs, emit)

    return () =>
      h(
        `${props.tag}`,
        {
          // 樣式
          class: {
            text: true,
            [`text-${props.size}`]: true,
            'text-required': props.isRequired,
          },
        },
        slots,
      )
  },
})
</script>
