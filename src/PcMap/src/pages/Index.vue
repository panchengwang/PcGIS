<template>
  <q-page class="flex flex-center">
    <map-editor />
  </q-page>
</template>

<script>

import MapEditor from 'src/components/mapcontrol/MapEditor.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { MapEditor },
  name: 'PageIndex',
  setup () {
    return {
    }
  }
})
</script>
