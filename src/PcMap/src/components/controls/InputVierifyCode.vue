<template>
  <q-input dense outlined label="验证码">
    <template v-slot:prepend>
      <q-icon name="o_code"/>
    </template>
    <template v-slot:append>
      <q-btn dense flat>获取验证码</q-btn>
    </template>
  </q-input>
</template>

<script>

import { defineComponent } from 'vue'

export default defineComponent({
})

</script>
