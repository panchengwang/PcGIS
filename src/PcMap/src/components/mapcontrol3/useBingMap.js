
import $ from 'jQuery'
import { toLonLat } from 'ol/proj'
// import { BackgroundMapType } from './useBackgroundMap'
import { uid } from 'quasar'
import { wgs84togcj02 } from './Gcj02Correct'
import { MapKeys } from './MapKeys'
import { BackgroundMapType } from './useBackgroundMap'

window.__bingMapAPIOK = false

function useBingMap (control) {
  if (control.bkMapBing) {
    changeBingMap(control)
    return
  }
  control.ids.bingID = uid()
  $('<div>').attr('id', control.ids.bingID).appendTo($('#' + control.ids.bkID)).css({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    'min-height': 'inherit'
  })
  if (window.__bingMapAPIOK) {
    initBingMap(control)
  } else {
    loadBingMapAPI(control)
  }
}

function changeBingMap (control) {
  try {
    control.bkMapBing.setMapType(getBingMapTypeId(control.backgroundMap))
  } catch (error) {
    window.alert('Bing地图不能为当前地区提供影像服务！可以强制使用网络代理解决此问题！')
    return
  }

  updateBingView(control)
}

function gcj02CorrectBing (control, lonlat) {
  if (!control.gcj02Correct || control.backgroundMap === BackgroundMapType.BING_SATELLITE) {
    return lonlat
  }
  lonlat = wgs84togcj02(lonlat)
  return lonlat
}

function getBingMapTypeId (type) {
  let maptype = ''
  switch (type) {
    case BackgroundMapType.BING_ROADMAP:
      // eslint-disable-next-line no-undef
      maptype = Microsoft.Maps.MapTypeId.road
      break
    case BackgroundMapType.BING_SATELLITE:
      // eslint-disable-next-line no-undef
      maptype = Microsoft.Maps.MapTypeId.aerial
      break
  }
  return maptype
}

function initBingMap (control) {
  window.__bingMapAPIOK = true
  let center = toLonLat(control.view.getCenter())
  center = gcj02CorrectBing(control, center)
  const zoom = control.view.getZoom()
  const maptype = getBingMapTypeId(control.backgroundMap)
  console.log('maptype', maptype)
  // eslint-disable-next-line no-undef
  control.bkMapBing = new Microsoft.Maps.Map(document.getElementById(control.ids.bingID), {
    // eslint-disable-next-line no-undef
    center: new Microsoft.Maps.Location(center[1], center[0]),
    // eslint-disable-next-line no-undef
    mapTypeId: maptype,
    zoom: zoom,
    showLocateMeButton: false,
    showScalebar: false,
    showTrafficButton: false,
    showTermsLink: false,
    showZoomButtons: false,
    allowHidingLabelsOfRoad: true
  })
  // if ($('.labelToggle_Input')) {
  //   $('.labelToggle_Input').click()
  //   // $('.labelToggle_Input').remove()
  // }
  changeBingMap(control)
  control.view.on('change:center', (e) => {
    updateBingView(control)
  })
  control.view.on('change:resolution', (e) => {
    updateBingView(control)
  })
}

window.__bingApiCallBack = function () {
  console.log('__bingApiCallBack')
}

function loadBingMapAPI (control) {
  control.$q.loading.show({
    message: '正在加载bing地图, 请稍候...'
  })
  const url = 'https://www.bing.com/api/maps/mapcontrol?callback=__bingApiCallBack&key='
  $.getScript(url + MapKeys.bing, () => {
    setTimeout(() => {
      control.$q.loading.hide()
      initBingMap(control)
    }, 1000)
  })
}

function updateBingView (control) {
  const center = gcj02CorrectBing(control, toLonLat(control.view.getCenter()))
  const zoom = control.view.getZoom()
  // eslint-disable-next-line no-undef
  let haslabel = Microsoft.Maps.LabelOverlay.hidden
  if (control.backgroundMap === BackgroundMapType.BING_SATELLITE) {
    // eslint-disable-next-line no-undef
    haslabel = Microsoft.Maps.LabelOverlay.hidden
  } else if (control.backgroundMap === BackgroundMapType.BING_ROADMAP) {
    // eslint-disable-next-line no-undef
    haslabel = Microsoft.Maps.LabelOverlay.visible
  }
  // eslint-disable-next-line no-undef
  control.bkMapBing.setView({
    // eslint-disable-next-line no-undef
    center: new Microsoft.Maps.Location(center[1], center[0]),
    zoom: zoom,
    // eslint-disable-next-line no-undef
    labelOverlay: haslabel
  })
}

export {
  useBingMap
}
