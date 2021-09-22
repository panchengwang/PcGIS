<template>
  <q-page class="flex flex-center">
    <map-control :backgroundMap="backgroundMap"/>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import MapControl from 'src/components/mapcontrol/MapControl.vue'
import { BackgroundMapType } from 'src/components/mapcontrol/useBackgroundMap'
export default defineComponent({
  name: 'PageIndex',
  components: { MapControl },
  setup () {
    const backgroundMap = ref(BackgroundMapType.QQ_SATELLITE)
    const changeBackground = () => {
      console.log('change')
      backgroundMap.value = '123'
    }
    return {
      backgroundMap,
      changeBackground
    }
  }
})
</script>
