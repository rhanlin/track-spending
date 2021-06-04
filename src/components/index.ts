import Select from './basic/Select.vue'
import BasicInput from './basic/Input.vue'
import Error from './basic/Error.vue'
import Text from './basic/Text.vue'
import Textarea from './basic/Textarea.vue'
import Toast from './basic/Toast.vue'
import Icon from './basic/Icon.vue'
import { Component } from 'vue'

const globalComponents: { [key: string]: Component } = {
  Select,
  BasicInput,
  Error,
  Text,
  Textarea,
  Toast,
  Icon,
}

export default globalComponents
