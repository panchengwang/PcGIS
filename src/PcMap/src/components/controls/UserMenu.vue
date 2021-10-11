<template>
  <q-btn-dropdown
    dense
    outlined
    icon="user"
    :label="nickname"
  >
    <q-list>
      <q-item clickable v-close-popup >
        <q-item-section avatar>
          <q-avatar icon="format_list_bulleted" color="primary" text-color="white" size="sm" />
        </q-item-section>
        <q-item-section>
          <q-item-label>使用记录</q-item-label>
          <!-- <q-item-label caption>February 22, 2016</q-item-label> -->
        </q-item-section>
        <!-- <q-item-section side>
          <q-icon name="help" color="primary" />
        </q-item-section> -->
      </q-item>

      <q-item clickable v-close-popup >
        <q-item-section avatar>
          <q-avatar icon="settings" color="primary" text-color="white" size="sm" />
        </q-item-section>
        <q-item-section>
          <q-item-label>系统设置</q-item-label>
          <!-- <q-item-label caption>February 22, 2016</q-item-label> -->
        </q-item-section>
        <!-- <q-item-section side>
          <q-icon name="help" color="primary" />
        </q-item-section> -->
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup () {
    const store = useStore()

    const nickname = computed(() => {
      return store.state.user.nickname
    })
    return {
      store,
      nickname
    }
  }
})
</script>
