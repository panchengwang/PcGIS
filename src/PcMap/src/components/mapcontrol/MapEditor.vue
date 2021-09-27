<template>
  <div class='fit'>
    <back-map-switcher :backMap="backMap" @backMapChanged="onBackMapChanged" style="z-index: 3;position: absolute; top: 10px; right: 10px; min-width: 180px" ></back-map-switcher>
    <div :id="mapID" class='fit'></div>
  </div>
</template>

<script>

import BackMapSwitcher from 'src/components/mapcontrol/BackMapSwitcher.vue'
import BackMapType from 'src/components/mapcontrol/BackMapType'
import MapControl from 'src/components/mapcontrol/MapControl'
import { defineComponent, ref, onMounted } from 'vue'
import { uid } from 'quasar'

export default defineComponent({
  components: { BackMapSwitcher },
  name: 'PageIndex',
  setup () {
    const mapID = ref(uid())
    const backMap = ref(BackMapType.OSM)
    const onBackMapChanged = (bkmap) => {
      backMap.value = bkmap
      if (mapcontrol) {
        mapcontrol.setBackMap(bkmap)
      }
    }
    let mapcontrol = null
    const initMap = () => {
      mapcontrol = new MapControl({
        div: mapID.value
      })
      mapcontrol.doSomething()
    }
    onMounted(() => {
      initMap()
    })

    return {
      mapID,
      backMap,
      onBackMapChanged,
      initMap
    }
  }
})
</script>
