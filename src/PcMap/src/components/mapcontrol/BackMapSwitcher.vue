<template>
  <div>
    <q-select
          label="背景地图"
          outlined
          dense
          v-model="_backMap"
          :options="options"
          options-dense
          bg-color="grey-3"
          style=""
          @update:model-value = "onSelectedValueChanged"
      />
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, watch } from 'vue'
import BackMapType from './BackMapType'

export default defineComponent({
  props: {
    modelValue: {
      type: Number,
      default: () => {
        return BackMapType.OPENSTREETMAP
      }
    }
  },
  emits: [
    'update:modelValue'
  ],
  setup (props, context) {
    const options = [{
      label: 'Open Street Map',
      value: BackMapType.OPENSTREETMAP
    }, {
      label: '谷歌影像(需出国代理)',
      value: BackMapType.GOOGLE_SATELLITE
    }, {
      label: '谷歌地图(需出国代理)',
      value: BackMapType.GOOGLE_ROADMAP
    // }, {
    //   label: 'Google Hybrid',
    //   value: BackMapType.GOOGLE_HYBRID
    }, {
      label: '谷歌地形(需出国代理)',
      value: BackMapType.GOOGLE_TERRAIN
    }, {
      label: '高德地图',
      value: BackMapType.GAODE_STANDARD
    }, {
      label: '高德影像',
      value: BackMapType.GAODE_SATELLITE
    }, {
      label: '高德路网',
      value: BackMapType.GAODE_ROADNET
    }, {
      label: '高德路况',
      value: BackMapType.GAODE_TRAFFIC
    }, {
      label: '高德路网+影像',
      value: BackMapType.GAODE_ROADNET_SATELLITE
    }, {
      label: '腾讯地图',
      value: BackMapType.QQ_ROAD
    }, {
      label: '腾讯影像',
      value: BackMapType.QQ_SATELLITE
    // }, {
    //   label: '腾讯路网+影像',
    //   value: BackMapType.QQ_ROAD_SATELLITE
    }, {
      label: '腾讯路况',
      value: BackMapType.QQ_TRAFFIC
    }, {
      label: '天地图街道地图',
      value: BackMapType.TIANDITU_NORMAL_MAP
    }, {
      label: '天地图卫星影像',
      value: BackMapType.TIANDITU_SATELLITE_MAP
    }, {
      label: '天地图混合地图',
      value: BackMapType.TIANDITU_HYBRID_MAP
    }, {
      label: '天地图地形',
      value: BackMapType.TIANDITU_TERRAIN_MAP
    }, {
      label: '天地图地形+路网',
      value: BackMapType.TIANDITU_TERRAIN_HYBRID_MAP
    }, {
      label: '必应地图',
      value: BackMapType.BING_ROADMAP
    }, {
      label: '必应影像(需强制出国代理)',
      value: BackMapType.BING_SATELLITE
    }, {
      label: '百度地图',
      value: BackMapType.BAIDU_NORMAL_MAP
    }, {
      label: '百度影像',
      value: BackMapType.BAIDU_SATELLITE_MAP
    }, {
      label: '百度路网+影像',
      value: BackMapType.BAIDU_HYBRID_MAP
    }, {
      label: '无背景地图',
      value: BackMapType.NOT_SET
    }]

    const onSelectedValueChanged = (val) => {
      _backMap.value = val
      context.emit('update:modelValue', val.value)
    }
    const _backMap = ref({})
    const setSelectedBkmapStatus = (type) => {
      for (let i = 0; i < options.length; i++) {
        const element = options[i]
        if (element.value === type) {
          _backMap.value = element
          return
        }
      }
      _backMap.value = {
        label: '无背景地图',
        value: BackMapType.NOT_SET
      }
    }

    onMounted(() => {
      setSelectedBkmapStatus(props.modelValue)
    })

    watch(
      () => props.modelValue,
      (first, second) => {
        setSelectedBkmapStatus(first)
      }
    )

    return {
      _backMap,
      options,
      // setSelectedBkmapStatus,
      onSelectedValueChanged
    }
  }
})
</script>
