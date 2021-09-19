import $ from 'jQuery'
import { toLonLat } from 'ol/proj'
import { BackgroundMapType } from './useBackgroundMap'
import { uid } from 'quasar'
import { wgs84togcj02 } from './Gcj02Correct'
import { MapKeys } from './MapKeys'

window.__googleMapAPIOK = false

function useGoogleMap (control) {
  if (control.bkMapGoogle) {
    changeGoogleMap(control)
    return
  }
  control.ids.googleID = uid()
  $('<div>').attr('id', control.ids.googleID).appendTo($('#' + control.ids.bkID)).css({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    'min-height': 'inherit'
  }).addClass('bk_google')
  if (window.__googleMapAPIOK) {
    initGoogleMap(control)
  } else {
    loadGoogleMapAPI(control)
  }
}

function getGoogleMapTypeId (type) {
  let maptype = ''
  if (type === BackgroundMapType.GOOGLE_SATELLITE) {
    maptype = 'satellite'
  } else if (type === BackgroundMapType.GOOGLE_ROADMAP) {
    maptype = 'roadmap'
  } else if (type === BackgroundMapType.GOOGLE_TERRAIN) {
    maptype = 'terrain'
  } else if (type === BackgroundMapType.GOOGLE_HYBRID) {
    maptype = 'hybrid'
  }
  return maptype
}

function changeGoogleMap (control) {
  control.bkMapGoogle.setMapTypeId(getGoogleMapTypeId(control.backgroundMap))
  updateGoogleView(control)
}

function initGoogleMap (control) {
  window.__googleMapAPIOK = true

  const center = gcj02CorrectGoogle(control, toLonLat(control.view.getCenter()))
  const zoom = control.view.getZoom()
  // eslint-disable-next-line no-undef
  const myLatlng = new google.maps.LatLng(center[1], center[0])
  const maptype = getGoogleMapTypeId(control.backgroundMap)
  const mapOptions = {
    zoom: zoom,
    center: myLatlng,
    mapTypeId: maptype
  }
  // eslint-disable-next-line no-undef
  control.bkMapGoogle = new google.maps.Map(document.getElementById(control.ids.googleID), mapOptions)

  // setInterval(() => {
  //   $('.gmnoprint').hide()
  //   $('#' + control.ids.googleID + ' > div:nth-child(2)').hide()
  //   // $('#' + control.ids.googleID + ' > div > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > div > div > div').hide()
  //   // const divs = document.querySelectorAll('#' + control.ids.googleID + ' > div > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > div > div > div')
  //   // for (let i = 0; i < divs.length; i++) {
  //   //   divs[i].style.display = 'none'
  //   // }
  // }, 1000)
  control.view.on('change:center', (e) => {
    updateGoogleView(control)
  })
  control.view.on('change:resolution', (e) => {
    updateGoogleView(control)
  })
}

function gcj02CorrectGoogle (control, lonlat) {
  if (!control.gcj02Correct || control.backgroundMap === BackgroundMapType.GOOGLE_SATELLITE) {
    return lonlat
  }
  lonlat = wgs84togcj02(lonlat)
  return lonlat
}

function updateGoogleView (control) {
  const center = gcj02CorrectGoogle(control, toLonLat(control.view.getCenter()))
  const zoom = control.view.getZoom()
  // eslint-disable-next-line no-undef
  const myLatlng = new google.maps.LatLng(center[1], center[0])
  control.bkMapGoogle.setCenter(myLatlng)
  control.bkMapGoogle.setZoom(zoom)
}

function loadGoogleMapAPI (control) {
  // window.__currentControl = control
  const url = 'https://maps.googleapis.com/maps/api/js?key='
  $.getScript(url + MapKeys.google, () => {
    initGoogleMap(control)
  })
}

export {
  useGoogleMap
}
