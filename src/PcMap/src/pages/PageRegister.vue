<template>
  <q-page class="row justify-center">
    <div class="fit" style="min-height:inherit;"></div>
    <pane-user-info v-model="userinfo" :class="isMobile ? 'for_mobile' : 'for_desktop'" @register="onRegister"></pane-user-info>
  </q-page>
</template>

<script>

import PaneUserInfo from 'src/components/controls/PaneUserInfo.vue'
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  components: { PaneUserInfo },
  name: 'PageWelcome',
  setup () {
    const $q = useQuasar()
    const userinfo = ref({
    })
    const onRegister = () => {
      console.log(userinfo.value)
    }
    return {
      isMobile: $q.platform.is.mobile,
      userinfo,

      onRegister
    }
  }
})
</script>

<style scoped>
  .for_desktop {
    position: absolute;
    top: 100px;
    min-width: 600px;
    width: 50%;
    max-width: 80%;
  }

  .for_mobile{
    position: absolute;
    top: 20px;
    min-width: inherit;
    left: 10px;
    right: 10px;
  }
</style>
