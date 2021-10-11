<template>
  <q-page class="flex flex-center bg-img" >
    <div class="fit" style="min-height:inherit;background-image: url('./icons/bg-photo.jpeg');background-size: cover;background-position: 50% calc(50% + 150px);filter:opacity(50%);"></div>
    <pane-login :class="platform.is.mobile ? 'login_mobile' : 'login_desktop'"></pane-login>
  </q-page>
</template>

<script>

import PaneLogin from 'src/components/controls/PaneLogin.vue'
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  components: { PaneLogin },
  name: 'PageWelcome',
  setup () {
    const $q = useQuasar()

    return {
      platform: $q.platform
    }
  }
})
</script>

<style scoped>
  .login_desktop {
    position: absolute;
    right: 20%;
    top: 20%;
  }

  .login_mobile {
    position: absolute;
    top: 20px;
    left: 10px;
    right: 10px;
    min-width: inherit;
  }
</style>
