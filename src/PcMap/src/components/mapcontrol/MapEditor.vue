<template>
  <div class='fit'>
    <back-map-switcher v-model="backMap" style="z-index: 3;position: absolute; top: 10px; right: 10px; min-width: 180px" ></back-map-switcher>
    <div :id="mapID" class='fit'></div>
  </div>
</template>

<script>

import BackMapSwitcher from 'src/components/mapcontrol/BackMapSwitcher.vue'
import BackMapType from 'src/components/mapcontrol/BackMapType'
import MapControl from 'src/components/mapcontrol/MapControl'
import { defineComponent, ref, onMounted, watch } from 'vue'
import { uid } from 'quasar'
import { DrawType } from './OperationType'

export default defineComponent({
  components: { BackMapSwitcher },
  name: 'PageIndex',
  setup () {
    const mapID = ref(uid())
    const backMap = ref(BackMapType.OSM)
    const onBackMapChanged = (bkmap) => {
      if (mapcontrol) {
        mapcontrol.setBackMap(backMap.value)
      }
    }
    let mapcontrol = null
    const initMap = () => {
      mapcontrol = new MapControl({
        div: mapID.value
      })
      mapcontrol.setDrawOperation(DrawType.Point)
      window.map = mapcontrol
    }
    onMounted(() => {
      initMap()
    })
    watch(backMap, (newval, oldval) => {
      onBackMapChanged(newval)
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
