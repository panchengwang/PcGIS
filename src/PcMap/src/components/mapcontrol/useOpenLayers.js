// import { ref } from 'vue'
import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
// import { fromLonLat } from 'ol/proj'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import { OSM, Vector as VectorSource } from 'ol/source'
import { defaults as olDefaultControls } from 'ol/control'
import { userOperation } from './userOperation'

function useOpenLayers (props, context, control) {
  control.bkMapOSM = new TileLayer({
    source: new OSM(),
    visible: false
  })

  control.view = new View({
    ...props.view,
    constrainResolution: true
  })

  control.draftSource = new VectorSource({})
  control.draftLayer = new VectorLayer({
    source: control.draftSource
  })
  control.olMap = new Map({
    target: control.ids.olID,
    layers: [
      control.bkMapOSM,
      control.draftLayer
    ],
    view: control.view,
    controls: olDefaultControls({
      attribution: false,
      zoom: false
    })
  })
  // control.view.on('change:center', (e) => {
  //   olViewChanged(control)
  // })

  userOperation(control)
}

// function olViewChanged (control) {

// }

export {
  useOpenLayers
}
