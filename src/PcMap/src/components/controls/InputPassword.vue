<template>
  <q-input dense outlined v-model="inputValue"
    @blur="onBlur"
    @update:model-value="onPasswordChanged"
    label="密码(至少包含大小写字母、数字,8-16个字符)" type="password">
    <template v-slot:prepend>
      <q-icon name="o_password" />
    </template>
  </q-input>
</template>

<script>

import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'
import { isValidPassword } from './Validator.js'

export default defineComponent({
  setup (props, context) {
    const $q = useQuasar()
    const inputValue = ref('')
    const onBlur = () => {
      console.log(inputValue)
      if (!isValidPassword(inputValue.value)) {
        $q.notify({
          position: 'top',
          message: '密码必须为包含大写字母、数字和下划线且长度为8-16之间的字符串'
        })
      }
    }
    const onPasswordChanged = (val) => {
      inputValue.value = val
    }
    return {
      inputValue,
      onBlur,
      onPasswordChanged
    }
  }
})

</script>
