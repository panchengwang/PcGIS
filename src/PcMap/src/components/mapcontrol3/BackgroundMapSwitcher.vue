<template>
  <q-select
        label="背景地图"
        outlined
        v-model="_backgroundMap"
        :options="options"
        options-dense
        bg-color="grey-3"
        style=""
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
      label: '谷歌影像(需出国代理)',
      value: BackgroundMapType.GOOGLE_SATELLITE
    }, {
      label: '谷歌地图(需出国代理)',
      value: BackgroundMapType.GOOGLE_ROADMAP
    // }, {
    //   label: 'Google Hybrid',
    //   value: BackgroundMapType.GOOGLE_HYBRID
    }, {
      label: '谷歌地形(需出国代理)',
      value: BackgroundMapType.GOOGLE_TERRAIN
    }, {
      label: '高德地图',
      value: BackgroundMapType.GAODE_STANDARD
    }, {
      label: '高德影像',
      value: BackgroundMapType.GAODE_SATELLITE
    }, {
      label: '高德路网',
      value: BackgroundMapType.GAODE_ROADNET
    }, {
      label: '高德路况',
      value: BackgroundMapType.GAODE_TRAFFIC
    }, {
      label: '高德路网+影像',
      value: BackgroundMapType.GAODE_ROADNET_SATELLITE
    }, {
      label: '腾讯地图',
      value: BackgroundMapType.QQ_ROAD
    }, {
      label: '腾讯影像',
      value: BackgroundMapType.QQ_SATELLITE
    // }, {
    //   label: '腾讯路网+影像',
    //   value: BackgroundMapType.QQ_ROAD_SATELLITE
    }, {
      label: '腾讯路况',
      value: BackgroundMapType.QQ_TRAFFIC
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
    }, {
      label: '必应地图',
      value: BackgroundMapType.BING_ROADMAP
    }, {
      label: '必应影像(需强制出国代理)',
      value: BackgroundMapType.BING_SATELLITE
    }, {
      label: '百度地图',
      value: BackgroundMapType.BAIDU_NORMAL_MAP
    }, {
      label: '百度影像',
      value: BackgroundMapType.BAIDU_SATELLITE_MAP
    }, {
      label: '百度路网+影像',
      value: BackgroundMapType.BAIDU_HYBRID_MAP
    }, {
      label: '无背景地图',
      value: BackgroundMapType.NOT_SET
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
      _backgroundMap.value = {
        label: '无背景地图',
        value: BackgroundMapType.NOT_SET
      }
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
