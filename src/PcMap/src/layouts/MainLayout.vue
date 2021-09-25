<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="q-ma-none">
        <q-btn
          flat
          dense
          round
        >
          <q-avatar size="36px" color="white">
            <img src="icons/logo_48.png" style="height:24px;width:24px;border-radius: 0;">
          </q-avatar>
        </q-btn>

        <q-toolbar-title>
          PcMap
        </q-toolbar-title>

        <div>wang_wang_lao@163.com</div>
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

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
  },

  setup () {
    // const leftDrawerOpen = ref(false)

    return {
      // leftDrawerOpen,
      // toggleLeftDrawer () {
      //   leftDrawerOpen.value = !leftDrawerOpen.value
      // }
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
