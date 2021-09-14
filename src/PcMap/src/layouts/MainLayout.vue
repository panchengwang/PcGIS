<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="q-ma-none">
        <q-btn
          flat
          dense
          round
        >
          <q-avatar size="30px">
            <img src="icons/logo_small.jpg">
          </q-avatar>
        </q-btn>

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
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
