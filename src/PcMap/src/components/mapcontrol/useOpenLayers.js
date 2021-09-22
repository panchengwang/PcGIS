// import { ref } from 'vue'
import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
// import { fromLonLat } from 'ol/proj'
import TileLayer from 'ol/layer/Tile'
import { OSM } from 'ol/source'
import { defaults as olDefaultControls } from 'ol/control'

function useOpenLayers (props, context, control) {
  control.bkMapOSM = new TileLayer({
    source: new OSM(),
    visible: false
  })

  control.view = new View({
    ...props.view,
    constrainResolution: true
  })

  control.olMap = new Map({
    target: control.ids.olID,
    layers: [control.bkMapOSM],
    view: control.view,
    controls: olDefaultControls({
      attribution: false,
      zoom: false
    })
  })
  control.view.on('change:center', (e) => {
    olViewChanged(control)
  })
}

function olViewChanged (control) {

}

export {
  useOpenLayers
}
