<template>
  <q-select
        label="背景地图"
        outlined
        v-model="_backgroundMap"
        :options="options"
        options-dense
        bg-color="grey-3"
        style="position: absolute; top: 10px; right: 10px; min-width: 180px"
        @update:model-value="onSelectedValueChanged"
      />
</template>

<script>
import { defineComponent, onMounted, ref, watch } from 'vue'
import { BackgroundMapType } from './useBackgroundMap'

export default defineComponent({
  props: {
    backgroundMap: {
      type: Number,
      require: false,
      default: () => {
        return BackgroundMapType.OPENSTREETMAP
      }
    }
  },
  setup (props, context) {
    const _backgroundMap = ref(BackgroundMapType.OPENSTREETMAP)
    const options = [{
      label: 'Open Street Map',
      value: BackgroundMapType.OPENSTREETMAP
    }, {
      label: '谷歌影像',
      value: BackgroundMapType.GOOGLE_SATELLITE
    }, {
      label: '谷歌地图',
      value: BackgroundMapType.GOOGLE_ROADMAP
    // }, {
    //   label: 'Google Hybrid',
    //   value: BackgroundMapType.GOOGLE_HYBRID
    }, {
      label: '谷歌地形',
      value: BackgroundMapType.GOOGLE_TERRAIN
    }, {
      label: '天地图街道地图',
      value: BackgroundMapType.TIANDITU_NORMAL_MAP
    }, {
      label: '天地图卫星影像',
      value: BackgroundMapType.TIANDITU_SATELLITE_MAP
    }, {
      label: '天地图混合地图',
      value: BackgroundMapType.TIANDITU_HYBRID_MAP
    }, {
      label: '天地图地形',
      value: BackgroundMapType.TIANDITU_TERRAIN_MAP
    }, {
      label: '天地图地形+路网',
      value: BackgroundMapType.TIANDITU_TERRAIN_HYBRID_MAP
    }]

    const onSelectedValueChanged = (val) => {
      _backgroundMap.value = val
      context.emit('backgroundMapChanged', val.value)
    }

    const setSelectedBkmapStatus = (type) => {
      for (let i = 0; i < options.length; i++) {
        const element = options[i]
        if (element.value === type) {
          _backgroundMap.value = element
          return
        }
      }
      _backgroundMap.value = ''
    }
    onMounted(() => {
      setSelectedBkmapStatus(props.backgroundMap)
    })

    watch(
      () => props.backgroundmap,
      (first, second) => {
        setSelectedBkmapStatus(first)
      }
    )

    return {
      _backgroundMap,
      options,
      // setSelectedBkmapStatus,
      onSelectedValueChanged
    }
  }
})
</script>
