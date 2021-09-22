
import $ from 'jQuery'
import { toLonLat } from 'ol/proj'
// import { BackgroundMapType } from './useBackgroundMap'
import { uid } from 'quasar'
import { wgs84togcj02, gcj02tobd09 } from './Gcj02Correct'
import { MapKeys } from './MapKeys'
import { BackgroundMapType } from './useBackgroundMap'

window.__baiduMapAPIOk = false

function useBaiduMap (control) {
  if (control.bkMapBaidu) {
    changeBaiduMap(control)
    return
  }
  control.ids.baiduID = uid()
  $('<div>').attr('id', control.ids.baiduID).appendTo($('#' + control.ids.bkID)).css({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    'min-height': 'inherit'
  })
  if (window.__baiduMapAPIOk) {
    initBaiduMap(control)
  } else {
    loadBaiduMapAPI(control)
  }
}

function changeBaiduMap (control) {
  try {
    control.bkMapBaidu.setMapType(getBaiduMapTypeId(control.backgroundMap))
  } catch (error) {
    window.alert('不明错误')
    return
  }

  updateBaiduView(control)
}

function baiduCoordinateCorrect (control, lonlat) {
  lonlat = wgs84togcj02(lonlat)
  lonlat = gcj02tobd09(lonlat)
  return lonlat
}

function getBaiduMapTypeId (type) {
  let maptype = ''
  switch (type) {
    case BackgroundMapType.BAIDU_NORMAL_MAP:
      // eslint-disable-next-line no-undef
      maptype = BMAP_NORMAL_MAP
      break
    case BackgroundMapType.BAIDU_SATELLITE_MAP:
      // eslint-disable-next-line no-undef
      maptype = BMAP_SATELLITE_MAP
      break
    case BackgroundMapType.BAIDU_HYBRID_MAP:
      // eslint-disable-next-line no-undef
      maptype = BMAP_HYBRID_MAP
      break
  }
  return maptype
}

function initBaiduMap (control) {
  window.__baiduMapAPIOk = true
  // let center = toLonLat(control.view.getCenter())
  // center = baiduCoordinateCorrect(control, center)
  // const zoom = control.view.getZoom()
  // const maptype = getBaiduMapTypeId(control.backgroundMap)

  // eslint-disable-next-line no-undef
  control.bkMapBaidu = new BMap.Map(control.ids.baiduID, {
    enableAutoResize: true
  })
  control.bkMapBaidu.disableContinuousZoom()
  // eslint-disable-next-line no-undef
  // control.bkMapBaidu.centerAndZoom(new BMap.Point(center[0], center[1]), zoom)
  changeBaiduMap(control)
  control.view.on('change:center', (e) => {
    updateBaiduView(control)
  })
  control.view.on('change:resolution', (e) => {
    updateBaiduView(control)
  })
}

function loadBaiduMapAPI (control) {
  const url = 'https://api.map.baidu.com/getscript?v=3.0&ak='
  $.getScript(url + MapKeys.baidu, () => {
    setTimeout(() => {
      initBaiduMap(control)
    }, 1000)
  })
}

function updateBaiduView (control) {
  const center = baiduCoordinateCorrect(control, toLonLat(control.view.getCenter()))
  const zoom = control.view.getZoom()
  // eslint-disable-next-line no-undef
  control.bkMapBaidu.centerAndZoom(new BMap.Point(center[0], center[1]), zoom + 1)
}

export {
  useBaiduMap
}
