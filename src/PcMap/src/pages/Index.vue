<template>
  <q-page class="flex flex-center">
    <map-control
      :backgroundMap="backgroundMap"
      :operation="operation.value"
      @click="onMapClicked" />
    <!-- <q-select
        label="选择绘制"
        outlined
        v-model="operation"
        :options="options"
        options-dense
        bg-color="grey-3"
        style="z-index: 3;position: absolute; top: 10px; right: 300px; min-width: 180px"
      /> -->
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import MapControl from 'src/components/mapcontrol/MapControl.vue'
import { BackgroundMapType } from 'src/components/mapcontrol/useBackgroundMap'
import { OperationType } from 'src/components/mapcontrol/useOperation'

export default defineComponent({
  name: 'PageIndex',
  components: { MapControl },
  setup () {
    const backgroundMap = ref(BackgroundMapType.OSM)
    const onMapClicked = (coord, pixel) => {
      console.log(coord)
    }
    const options = [
      { label: 'Point', value: OperationType.DRAW_POINT },
      { label: 'LineString', value: OperationType.DRAW_LINESTRING },
      { label: 'Polygon', value: OperationType.DRAW_POLYGON }
    ]
    const operation = ref(options[0])

    return {
      backgroundMap,
      operation,

      options,

      onMapClicked
    }
  }
})
</script>
