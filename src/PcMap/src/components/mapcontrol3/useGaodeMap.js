import $ from 'jQuery'
import { toLonLat } from 'ol/proj'
import { BackgroundMapType } from './useBackgroundMap'
import { uid } from 'quasar'
import { wgs84togcj02 } from './Gcj02Correct'
import { MapKeys } from './MapKeys'

window.__gaodeMapAPIOK = false

function useGaodeMap (control) {
  if (control.bkMapGaode) {
    changeGaoMap(control)
    return
  }
  control.ids.gaodeID = uid()
  $('<div>').attr('id', control.ids.gaodeID).appendTo($('#' + control.ids.bkID)).css({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    'min-height': 'inherit'
  })
  if (window.__gaodeMapAPIOK) {
    initGaodeMap(control)
  } else {
    loadGaodeMapAPI(control)
  }
}

function gcj02CorrectGaode (control, lonlat) {
  lonlat = wgs84togcj02(lonlat)
  return lonlat
}

function initGaodeMap (control) {
  // console.log('init gaode')
  // eslint-disable-next-line no-undef
  window.__gaodeMapAPIOK = true
  let center = toLonLat(control.view.getCenter())
  center = gcj02CorrectGaode(control, center)
  const zoom = control.view.getZoom()
  // eslint-disable-next-line no-undef
  control.bkMapGaodeStandard = new AMap.TileLayer({
    visible: true,
    opacity: 1,
    zIndex: 0
  })
  // eslint-disable-next-line no-undef
  control.bkMapGaodeSatellite = new AMap.TileLayer.Satellite()
  // eslint-disable-next-line no-undef
  control.bkMapGaodeRoadNet = new AMap.TileLayer.RoadNet()
  // eslint-disable-next-line no-undef
  control.bkMapGaodeTraffic = new AMap.TileLayer.Traffic({
    autoRefresh: true,
    interval: 180
  })
  // eslint-disable-next-line no-undef
  control.bkMapGaode = new AMap.Map(control.ids.gaodeID, {
    layers: [
      control.bkMapGaodeStandard,
      control.bkMapGaodeSatellite,
      control.bkMapGaodeRoadNet,
      control.bkMapGaodeTraffic
    ],
    center: center,
    zoom: zoom,
    animateEnable: false
  })
  // // const maptype = getGaodeMapTypeID(control.backgroundMap)
  // // eslint-disable-next-line no-undef
  // control.bkMapTianditu = new T.Map(control.ids.gaodeID, {})
  // // eslint-disable-next-line no-undef
  // control.bkMapTianditu.centerAndZoom(new T.LngLat(center[0], center[1]), zoom)
  // // eslint-disable-next-line no-undef
  changeGaoMap(control)
  // updateGaodeView(control)
  control.view.on('change:center', (e) => {
    updateGaodeView(control)
  })
  control.view.on('change:resolution', (e) => {
    updateGaodeView(control)
  })
}

function updateGaodeView (control) {
  const center = gcj02CorrectGaode(control, toLonLat(control.view.getCenter()))
  const zoom = control.view.getZoom()
  // eslint-disable-next-line no-undef
  control.bkMapGaode.setZoomAndCenter(zoom, center)
}

function loadGaodeMapAPI (control) {
  control.$q.loading.show({
    message: '正在加载高德地图, 请稍候...'
  })
  const url = 'https://webapi.amap.com/maps?v=1.4.15&key='
  $.getScript(url + MapKeys.gaode, () => {
    control.$q.loading.hide()
    initGaodeMap(control)
  })
}

// function getGaodeMapTypeID (type) {
//   return type
//   // let maptype = ''
//   // if (type === BackgroundMapType.GAODE_STANDARD) {
//   //   // eslint-disable-next-line no-undef
//   //   maptype = TMAP_HYBRID_MAP
//   // } else if (type === BackgroundMapType.GAODE_SATELLITE) {
//   //   // eslint-disable-next-line no-undef
//   //   maptype = TMAP_NORMAL_MAP
//   // } else if (type === BackgroundMapType.GAODE_TRAFFIC) {
//   //   // eslint-disable-next-line no-undef
//   //   maptype = TMAP_SATELLITE_MAP
//   // } else if (type === BackgroundMapType.GAODE_ROADNET) {
//   //   // eslint-disable-next-line no-undef
//   //   maptype = TMAP_TERRAIN_HYBRID_MAP
//   // }
//   // return maptype
// }

function changeGaoMap (control) {
  // control.bkMapTianditu.setMapType(getGaodeMapTypeID(control.backgroundMap))

  control.bkMapGaodeStandard.hide()
  control.bkMapGaodeSatellite.hide()
  control.bkMapGaodeRoadNet.hide()
  control.bkMapGaodeTraffic.hide()

  if (control.backgroundMap === BackgroundMapType.GAODE_STANDARD) {
    control.bkMapGaodeStandard.show()
  } else if (control.backgroundMap === BackgroundMapType.GAODE_SATELLITE) {
    control.bkMapGaodeSatellite.show()
  } else if (control.backgroundMap === BackgroundMapType.GAODE_ROADNET) {
    control.bkMapGaodeRoadNet.show()
  } else if (control.backgroundMap === BackgroundMapType.GAODE_TRAFFIC) {
    control.bkMapGaodeTraffic.show()
    control.bkMapGaodeStandard.show()
  } else if (control.backgroundMap === BackgroundMapType.GAODE_ROADNET_SATELLITE) {
    control.bkMapGaodeRoadNet.show()
    control.bkMapGaodeSatellite.show()
  }
  updateGaodeView(control)
}

export {
  useGaodeMap
}
