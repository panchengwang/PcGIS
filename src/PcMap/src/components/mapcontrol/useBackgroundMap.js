import { watch } from 'vue'
import { useGoogleMap } from './useGoogleMap'
import { useTiandituMap } from './useTianDiTu'
import $ from 'jQuery'

const BackgroundMapType = {
  OPENSTREETMAP: 1,
  OSM: 1,
  GOOGLE_SATELLITE: 2,
  GOOGLE_ROADMAP: 3,
  GOOGLE_HYBRID: 4,
  GOOGLE_TERRAIN: 5,
  TIANDITU_NORMAL_MAP: 6,
  TIANDITU_SATELLITE_MAP: 7,
  TIANDITU_HYBRID_MAP: 8,
  TIANDITU_TERRAIN_MAP: 9,
  TIANDITU_TERRAIN_HYBRID_MAP: 10
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
}

export {
  BackgroundMapType,
  useBackgroundMap,
  setBackGroundMap
}
