<template>
  <div class="full" :id="control.ids.mapID">
    <div class="full" :id="control.ids.olID" style="z-index: 2;">
      <q-resize-observer @resize="onOlMapResize" />
    </div>
    <div class="full" :id="control.ids.bkID" style="z-index: 1;"></div>
  </div>
  <background-map-switcher dense :backgroundMap="backgroundMap" v-if="bkmapSwitcherVisible"
    @backgroundMapChanged="onBackgroundMapChanged"
    style="z-index: 3;position: absolute; top: 10px; right: 10px; min-width: 180px" />
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import { uid, useQuasar } from 'quasar'
import { useOpenLayers } from './useOpenLayers'
import { useBackgroundMap, setBackGroundMap, BackgroundMapType } from './useBackgroundMap'
import { fromLonLat } from 'ol/proj'
import BackgroundMapSwitcher from './BackgroundMapSwitcher.vue'
import { OperationType } from './useOperation'

export default defineComponent({
  components: { BackgroundMapSwitcher },
  name: 'MapControl',
  emits: [
    'click',
    'feature_click'
  ],
  props: {
    backgroundMap: {
      type: Number,
      required: false,
      default: () => { return BackgroundMapType.OPENSTREETMAP }
    },
    operation: {
      type: Number,
      required: false,
      default: () => { return OperationType.NOTHING }
    },
    bkmapSwitcherVisible: {
      type: Boolean,
      required: true,
      default: () => true
    },
    view: {
      type: Object,
      required: true,
      default: () => {
        return {
          // center: fromLonLat([112.92688166666667, 28.164605]),
          center: fromLonLat([111.30850576967045, 27.32099818500464]),
          maxZoom: 23,
          zoom: 15
        }
      }
    },
    gcj02Correct: {
      type: Boolean,
      required: true,
      default: () => { return true }
    }
  },
  setup (props, context) {
    const control = {
      ids: {
        mapID: uid(),
        olID: uid(),
        bkID: uid()
      },
      view: null,
      olMap: null,
      bkMapOSM: null,
      bkMapGoogle: null,
      bkMapTianditu: null,
      bkMapGaode: null,
      bkMapBing: null,
      bkMapBaidu: null,
      bkMapQQ: null,
      backgroundMap: props.backgroundMap,
      operation: props.operation,
      // 是否需要gcj02纠偏
      gcj02Correct: props.gcj02Correct,

      $q: useQuasar()
    }

    onMounted(() => {
      useOpenLayers(props, context, control)
      useBackgroundMap(props, context, control)
      setBackGroundMap(control, control.backgroundMap)
    })

    const onOlMapResize = () => {
      if (control.olMap) {
        control.olMap.updateSize()
      }
    }

    const onBackgroundMapChanged = (bk) => {
      control.backgroundMap = bk
      setBackGroundMap(control, bk)
    }

    return {
      control,
      BackgroundMapType,
      onOlMapResize,
      onBackgroundMapChanged
    }
  }
})
</script>

<style lang="scss" scoped>
.full {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: inherit;
}
</style>
