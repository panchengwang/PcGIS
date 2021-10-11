<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="q-ma-none" style="min-height:36px;">
        <q-btn
          flat
          dense
          round
        >
          <q-avatar size="26px" color="white">
            <img src="icons/logo_48.png" style="height:20px;width:20px;border-radius: 0;">
          </q-avatar>
        </q-btn>

        <q-toolbar-title style="font-size: 16px;">
          PcMap -- 麓山老将的GIS呓语
        </q-toolbar-title>

        <div>
          <user-menu v-if="store.state.user.token !== ''"></user-menu>
        </div>
      </q-toolbar>
    </q-header>

    <!-- <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer> -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import UserMenu from 'src/components/controls/UserMenu.vue'
import { defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'MainLayout',

  components: {
    UserMenu
  },

  setup () {
    const store = useStore()
    onMounted(() => {
      // console.log(store)
    })
    return {
      store
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
