<template>
  <q-input v-model="inputValue" @update:model-value="onInputChanged" dense outlined label="用户名(EMail或移动电话)" @blur="onBlur">
    <template v-slot:prepend>
      <q-icon name="o_person" />
    </template>
  </q-input>
</template>

<script>

import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'
import { isEmail, isMobile } from './Validator.js'

export default defineComponent({
  setup (props, context) {
    const inputValue = ref('')
    const $q = useQuasar()

    const onBlur = () => {
      if (!isEmail(inputValue.value) && !isMobile(inputValue.value)) {
        $q.notify({
          message: '请输入有效的email或者移动电话号码',
          position: 'top',
          timeout: 1500
        })
      }
    }

    const onInputChanged = (val) => {
      inputValue.value = val
    }
    return {
      inputValue,
      onBlur,
      onInputChanged
    }
  }
})

</script>
