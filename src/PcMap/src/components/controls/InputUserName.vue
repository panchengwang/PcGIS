<template>
  <q-input dense outlined abel="Outlined" label="用户名(EMail或移动电话)">
    <template v-slot:prepend>
      <q-icon name="o_person" />
    </template>
  </q-input>
</template>

<script>

import { defineComponent } from 'vue'

export default defineComponent({
})

</script>
