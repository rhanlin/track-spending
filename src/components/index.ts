import Select from './basic/Select.vue'
import Input from './basic/Input.vue'
import Error from './basic/Error.vue'
import Text from './basic/Text.vue'
import Textarea from './basic/Textarea.vue'
import Toast from './basic/Toast.vue'
import { Component } from 'vue'

// export default { Select, Input, Error, Text, Textarea } as {
//   [key: string]: DefineComponent
// }

const globalComponents: { [key: string]: Component } = {
  Select,
  Input,
  Error,
  Text,
  Textarea,
  Toast,
}

export default globalComponents
