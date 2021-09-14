<template>
  <div class="full" >
    <div class="full" ></div>
    <div class="full" ></div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import { uid } from 'quasar'
import { useBackgroundMap } from './useBackgroundMap'

export default defineComponent({
  name: 'MapControl',
  props: {
    backgroundMap: {
      type: String,
      required: false
    }
  },
  setup (props, context) {
    const mapDivID = uid()
    const olDivID = uid()
    const bkDivID = uid()

    onMounted(() => {
      useBackgroundMap(props, context)
    })

    return {
      mapDivID, olDivID, bkDivID
    }
  }
})
</script>

<style lang="scss" scoped>
.full {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: inherit;
}
</style>
