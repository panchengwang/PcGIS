import $ from 'jQuery'
import { toLonLat } from 'ol/proj'
import { BackgroundMapType } from './useBackgroundMap'
import { uid } from 'quasar'
// import { wgs84togcj02 } from './Gcj02Correct'
import { MapKeys } from './MapKeys'

window.__tiandituMapAPIOK = false

function useTiandituMap (control) {
  if (control.bkMapTianditu) {
    changeTiandituMap(control)
    return
  }
  control.ids.tiandituID = uid()
  $('<div>').attr('id', control.ids.tiandituID).appendTo($('#' + control.ids.bkID)).css({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    'min-height': 'inherit'
  })
  if (window.__tiandituMapAPIOK) {
    initTiandituMap(control)
  } else {
    loadTiandituMapAPI(control)
  }
}

function gcj02CorrectTianditu (control, lonlat) {
  // lonlat = wgs84togcj02(lonlat)
  return lonlat
}

function initTiandituMap (control) {
  // eslint-disable-next-line no-undef
  window.__tiandituMapAPIOK = true
  let center = toLonLat(control.view.getCenter())
  center = gcj02CorrectTianditu(control, center)
  const zoom = control.view.getZoom()
  // const maptype = getTiandituMapTypeID(control.backgroundMap)
  // eslint-disable-next-line no-undef
  control.bkMapTianditu = new T.Map(control.ids.tiandituID, {})
  // eslint-disable-next-line no-undef
  control.bkMapTianditu.centerAndZoom(new T.LngLat(center[0], center[1]), zoom)
  // eslint-disable-next-line no-undef
  changeTiandituMap(control)
  // updateTiandituView(control)
  control.view.on('change:center', (e) => {
    updateTiandituView(control)
  })
  control.view.on('change:resolution', (e) => {
    updateTiandituView(control)
  })
}

function updateTiandituView (control) {
  const center = gcj02CorrectTianditu(control, toLonLat(control.view.getCenter()))
  const zoom = control.view.getZoom()
  // eslint-disable-next-line no-undef
  control.bkMapTianditu.centerAndZoom(new T.LngLat(center[0], center[1]), zoom)
}

function loadTiandituMapAPI (control) {
  const url = 'http://api.tianditu.gov.cn/api?v=4.0&tk='
  $.getScript(url + MapKeys.tianditu, () => {
    initTiandituMap(control)
  })
}

function getTiandituMapTypeID (type) {
  let maptype = ''
  if (type === BackgroundMapType.TIANDITU_HYBRID_MAP) {
    // eslint-disable-next-line no-undef
    maptype = TMAP_HYBRID_MAP
  } else if (type === BackgroundMapType.TIANDITU_NORMAL_MAP) {
    // eslint-disable-next-line no-undef
    maptype = TMAP_NORMAL_MAP
  } else if (type === BackgroundMapType.TIANDITU_SATELLITE_MAP) {
    // eslint-disable-next-line no-undef
    maptype = TMAP_SATELLITE_MAP
  } else if (type === BackgroundMapType.TIANDITU_TERRAIN_HYBRID_MAP) {
    // eslint-disable-next-line no-undef
    maptype = TMAP_TERRAIN_HYBRID_MAP
  } else if (type === BackgroundMapType.TIANDITU_TERRAIN_MAP) {
    // eslint-disable-next-line no-undef
    maptype = TMAP_TERRAIN_MAP
  }
  return maptype
}

function changeTiandituMap (control) {
  control.bkMapTianditu.setMapType(getTiandituMapTypeID(control.backgroundMap))
  updateTiandituView(control)
}

export {
  useTiandituMap
}
