import $ from 'jQuery'
import { toLonLat } from 'ol/proj'
import { BackgroundMapType } from './useBackgroundMap'
import { uid } from 'quasar'
import { wgs84togcj02 } from './Gcj02Correct'
import { MapKeys } from './MapKeys'

window.__qqMapAPIOk = false

function useQQMap (control) {
  if (control.bkMapQQ) {
    changeQQMap(control)
    return
  }
  control.ids.qqID = uid()
  $('<div>').attr('id', control.ids.qqID).appendTo($('#' + control.ids.bkID)).css({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    'min-height': 'inherit'
  }).addClass('bk_qq')
  if (window.__qqMapAPIOK) {
    initQQMap(control)
  } else {
    loadQQMapAPI(control)
  }
}

// function getQQMapTypeID (bkmap) {
//   // eslint-disable-next-line no-undef
//   let maptype = qq.maps.MapTypeId.ROADMAP
//   switch (bkmap) {
//     case BackgroundMapType.QQ_ROAD:
//       // eslint-disable-next-line no-undef
//       maptype = qq.maps.MapTypeId.ROADMAP
//       break
//     case BackgroundMapType.QQ_SATELLITE:
//       // eslint-disable-next-line no-undef
//       maptype = qq.maps.MapTypeId.SATELLITE
//       break
//     case BackgroundMapType.QQ_ROAD_SATELLITE:
//       // eslint-disable-next-line no-undef
//       maptype = qq.maps.MapTypeId.HYBRID
//       break
//   }
//   return maptype
// }

function changeQQMap (control) {
  // control.bkMapQQ.setMapTypeId(getQQMapTypeID(control.backgroundMap))
  control.bkMapQQ.setBaseMap({ type: 'vector' })
  switch (control.backgroundMap) {
    case BackgroundMapType.QQ_ROAD:
      control.bkMapQQ.setBaseMap({ type: 'vector' })
      break
    case BackgroundMapType.QQ_SATELLITE:
      control.bkMapQQ.setBaseMap({ type: 'satellite', features: ['base'] })
      break
    case BackgroundMapType.QQ_TRAFFIC:
      control.bkMapQQ.setBaseMap([
        { type: 'vector' },
        { type: 'traffic' }
      ])
      break
  }
  updateQQView(control)
}

function gcj02CorrectQQ (control, lonlat) {
  lonlat = wgs84togcj02(lonlat)
  return lonlat
}

function initQQMap (control) {
  window.__qqMapAPIOK = true
  // eslint-disable-next-line no-undef
  control.bkMapQQ = new TMap.Map(document.getElementById(control.ids.qqID), {
    basemap: {
      type: 'vector'
    }
  })
  setTimeout(() => {
    changeQQMap(control)
  }, 1000)

  control.view.on('change:center', (e) => {
    updateQQView(control)
  })
  control.view.on('change:resolution', (e) => {
    updateQQView(control)
  })
}

function updateQQView (control) {
  let center = toLonLat(control.view.getCenter())
  center = gcj02CorrectQQ(control, center)
  const zoom = control.view.getZoom()
  // eslint-disable-next-line no-undef
  control.bkMapQQ.setCenter(new TMap.LatLng(center[1], center[0]))
  control.bkMapQQ.setZoom(zoom)
}

window.__initQQMap = () => {
  console.log('__init qq map')
}

function loadQQMapAPI (control) {
  const url = 'https://map.qq.com/api/gljs?v=1.exp&callback=__initQQMap&key='
  $.getScript(url + MapKeys.qq, () => {
    setTimeout(() => {
      initQQMap(control)
    }, 1000)
  })
}

export {
  useQQMap
}
