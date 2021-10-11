<template>
  <q-input dense outlined abel="Outlined" label="密码(至少包含大小写字母、数字,8-18个字符)" type="password">
    <template v-slot:prepend>
      <q-icon name="o_password" />
    </template>
  </q-input>
</template>

<script>

import { defineComponent } from 'vue'

export default defineComponent({
})

</script>
