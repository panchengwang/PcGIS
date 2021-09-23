import { watch } from 'vue'
import { useGoogleMap } from './useGoogleMap'
import { useTiandituMap } from './useTianDiTu'
import { useGaodeMap } from './useGaodeMap'
import { useBingMap } from './useBingMap'
import { useQQMap } from './useQQMap'
// import { useBaiduMap } from './useBaiduMap'
import $ from 'jQuery'

const BackgroundMapType = {
  NOT_SET: 0,

  OPENSTREETMAP: 1,
  OSM: 1,

  GOOGLE_SATELLITE: 21,
  GOOGLE_ROADMAP: 22,
  GOOGLE_HYBRID: 23,
  GOOGLE_TERRAIN: 24,

  TIANDITU_NORMAL_MAP: 31,
  TIANDITU_SATELLITE_MAP: 32,
  TIANDITU_HYBRID_MAP: 33,
  TIANDITU_TERRAIN_MAP: 34,
  TIANDITU_TERRAIN_HYBRID_MAP: 35,

  GAODE_STANDARD: 41,
  GAODE_SATELLITE: 42,
  GAODE_ROADNET: 43,
  GAODE_TRAFFIC: 44,
  GAODE_ROADNET_SATELLITE: 45,

  BING_ROADMAP: 51,
  BING_SATELLITE: 52,

  BAIDU_NORMAL_MAP: 61,
  BAIDU_SATELLITE_MAP: 62,
  BAIDU_HYBRID_MAP: 63,

  QQ_ROAD: 71,
  QQ_SATELLITE: 72,
  QQ_ROAD_SATELLITE: 73,
  QQ_TRAFFIC: 74
}

function useBackgroundMap (props, context, control) {
  watch(
    () => props.backgroundMap,
    (first, second) => {
      setBackGroundMap(control, first)
    }
  )
}

function setBackGroundMap (control, bkmap) {
  control.backgroundMap = bkmap

  if (bkmap === BackgroundMapType.OPENSTREETMAP) {
    control.bkMapOSM.setVisible(true)
  } else {
    control.bkMapOSM.setVisible(false)
  }

  if (bkmap === BackgroundMapType.GOOGLE_HYBRID ||
    bkmap === BackgroundMapType.GOOGLE_ROADMAP ||
    bkmap === BackgroundMapType.GOOGLE_SATELLITE ||
    bkmap === BackgroundMapType.GOOGLE_TERRAIN) {
    useGoogleMap(control)
    if (control.bkMapGoogle) {
      $('#' + control.ids.googleID).show()
    }
  } else {
    if (control.bkMapGoogle) {
      $('#' + control.ids.googleID).hide()
    }
  }

  if (bkmap === BackgroundMapType.TIANDITU_HYBRID_MAP ||
    bkmap === BackgroundMapType.TIANDITU_NORMAL_MAP ||
    bkmap === BackgroundMapType.TIANDITU_SATELLITE_MAP ||
    bkmap === BackgroundMapType.TIANDITU_TERRAIN_HYBRID_MAP ||
    bkmap === BackgroundMapType.TIANDITU_TERRAIN_MAP) {
    useTiandituMap(control)
    if (control.bkMapTianditu) {
      $('#' + control.ids.tiandituID).show()
    }
  } else {
    if (control.bkMapTianditu) {
      $('#' + control.ids.tiandituID).hide()
    }
  }

  if (bkmap === BackgroundMapType.GAODE_ROADNET ||
    bkmap === BackgroundMapType.GAODE_SATELLITE ||
    bkmap === BackgroundMapType.GAODE_STANDARD ||
    bkmap === BackgroundMapType.GAODE_TRAFFIC ||
    bkmap === BackgroundMapType.GAODE_ROADNET_SATELLITE) {
    useGaodeMap(control)
    if (control.bkMapGaode) {
      $('#' + control.ids.gaodeID).show()
    }
  } else {
    if (control.bkMapGaode) {
      $('#' + control.ids.gaodeID).hide()
    }
  }

  if (bkmap === BackgroundMapType.QQ_ROAD ||
    bkmap === BackgroundMapType.QQ_SATELLITE ||
    // bkmap === BackgroundMapType.QQ_ROAD_SATELLITE ||
    bkmap === BackgroundMapType.QQ_TRAFFIC) {
    useQQMap(control)
    if (control.bkMapQQ) {
      $('#' + control.ids.qqID).show()
    }
  } else {
    if (control.bkMapQQ) {
      $('#' + control.ids.qqID).hide()
    }
  }

  if (bkmap === BackgroundMapType.BING_ROADMAP ||
    bkmap === BackgroundMapType.BING_SATELLITE) {
    useBingMap(control)
    if (control.bkMapBing) {
      $('#' + control.ids.bingID).show()
    }
  } else {
    if (control.bkMapBing) {
      $('#' + control.ids.bingID).hide()
    }
  }

  if (bkmap === BackgroundMapType.BAIDU_NORMAL_MAP ||
    bkmap === BackgroundMapType.BAIDU_SATELLITE_MAP ||
    bkmap === BackgroundMapType.BAIDU_HYBRID_MAP) {
  //   useBaiduMap(control)
  //   if (control.bkMapBaidu) {
  //     $('#' + control.ids.baiduID).show()
  //   }
  // } else {
  //   if (control.bkMapBaidu) {
  //     $('#' + control.ids.baiduID).show()
  //   }
    window.alert('由于百度的坐标系问题，暂缓支持使用百度地图作为背景图')
  }
}

export {
  BackgroundMapType,
  useBackgroundMap,
  setBackGroundMap
}
