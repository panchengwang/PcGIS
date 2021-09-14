import { watch } from 'vue'

const BackgroundMapType = {
  GOOGLE_SATELLITE: 1,
  GOOGLE_ROADMAP: 2,
  GOOGLE_HYBRID: 3,
  GOOGLE_TERRAIN: 4
}

function useBackgroundMap (props, context) {
  const setBackGroundMap = (bkmap) => {
    console.log(bkmap)
  }

  watch(
    () => props.backgroundMap,
    (first, second) => {
      setBackGroundMap(first)
    }
  )
}

export {
  BackgroundMapType,
  useBackgroundMap
}
