import Draw from 'ol/interaction/Draw'
import { watch } from 'vue'

const OperationType = {
  NOTHING: 0,
  CLICK: 1,
  DRAW_POINT: 2,
  DRAW_LINESTRING: 3,
  DRAW_POLYGON: 4
}

let currentOperation = null

function useOperation (props, context, control) {
  control.olMap.on('click', (e) => {
    context.emit('click', e.coordinate, e.pixel)
  })

  control.pointDraw = new Draw({ source: control.draftSource, type: 'Point' })
  control.linestringDraw = new Draw({ source: control.draftSource, type: 'LineString' })
  control.polygonDraw = new Draw({ source: control.draftSource, type: 'Polygon' })

  const setOperation = (op) => {
    control.operation = props.operation
    if (currentOperation) {
      control.olMap.removeInteraction(currentOperation)
    }
    if (op === OperationType.DRAW_POINT) {
      currentOperation = control.pointDraw
    } else if (op === OperationType.DRAW_LINESTRING) {
      currentOperation = control.linestringDraw
    } else if (op === OperationType.DRAW_POLYGON) {
      currentOperation = control.polygonDraw
    }

    if (currentOperation) {
      control.olMap.addInteraction(currentOperation)
    }
  }
  setOperation(props.operation)
  watch(
    () => props.operation,
    (first, second) => {
      setOperation(first)
    }
  )
}

export {
  OperationType,
  useOperation
}
