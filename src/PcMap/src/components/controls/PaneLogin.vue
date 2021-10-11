<template>
  <q-card class="pane">
    <q-card-section class="bg-primary text-white q-pa-sm q-ma-none">
      <div class="text-subtitle1">欢迎使用PcMap</div>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-gutter-sm q-pa-sm">
      <!-- <q-input dense outlined abel="Outlined" label="用户名(EMail或移动电话)"/> -->
      <input-user-name></input-user-name>
      <input-password></input-password>
      <q-btn-group spread>
        <q-btn  unelevated color="primary" text-color="white" icon="login">登录</q-btn>
      </q-btn-group>
    </q-card-section>
    <q-separator />
    <q-card-actions align="between">
      <q-item dense clickable class='link' style="padding-top: 6px;" @click="onRegister">没有账号？注册一个</q-item>
      <q-item dense clickable class='link' style="padding-top: 6px;">忘记密码？</q-item>
      <!-- <q-btn unelevated dense color="primary" text-color="white" icon="person_add" @click="onRegister">注册</q-btn> -->
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import InputPassword from './InputPassword.vue'
import InputUserName from './InputUserName.vue'

export default defineComponent({
  components: { InputPassword, InputUserName },
  setup () {
    const store = useStore()
    const router = useRouter()
    const onRegister = () => {
      router.push('register')
    }
    return {
      store,

      onRegister
    }
  }
})
</script>

<style scoped>
  .pane {
    min-width: 400px;
  }
</style>
