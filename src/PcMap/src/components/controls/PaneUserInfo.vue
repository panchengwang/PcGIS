<template>
  <q-card flat bordered class="pane no-shadow">
    <q-card-section outlined class="bg-primary text-white q-pa-sm row">
      <q-avatar size="sm" color="white" class="q-mr-sm">
        <img src="icons/logo_48.png" style="height:20px;width:20px;border-radius: 0;">
      </q-avatar>
      <div class="text-subtitle1" >欢迎注册</div>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-gutter-sm q-pa-sm">
      <!-- <q-input v-model="_value.username"/> -->
      <input-user-name v-model="userinfo.username"></input-user-name>
      <input-password  v-model="userinfo.password"></input-password>
      <input-password label="确认密码" v-model="userinfo.password2"> </input-password>
      <input-user-name label="昵称" v-model="userinfo.nickname"> </input-user-name>
      <input-vierify-code  v-model="userinfo.verifycode"></input-vierify-code>
      <!-- <div class="full-width row inline justify-between q-gutter-sm q-gutter-y-none" >
        <q-input style="flex:1;" dense outlined label="请输入验证码"/>
        <q-btn  unelevated dense color="primary" text-color="white" icon="check">获取验证码</q-btn>
      </div> -->
      <!-- <q-uploader
        url="http://localhost:4444/upload"
        dense
        label="头像"
        square
        flat
        class="full-width q-pl-sm"
      /> -->
    </q-card-section>
    <q-separator />
    <q-btn-group spread>
        <q-btn unelevated color="primary" text-color="white" icon="clear" @click="onCancel">取消</q-btn>
        <q-btn unelevated color="primary" text-color="white" icon="check" @click="onRegister">注册</q-btn>
    </q-btn-group>
  </q-card>
</template>

<script>
import { defineComponent, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import InputUserName from './InputUserName.vue'
import InputPassword from './InputPassword.vue'
import InputVierifyCode from './InputVierifyCode.vue'

export default defineComponent({
  props: {
    modelValue: {
      type: Object
    }
  },
  components: { InputUserName, InputPassword, InputVierifyCode },
  emits: ['cancel', 'update:modelValue'],
  setup (props, context) {
    const store = useStore()
    const router = useRouter()
    const onCancel = () => {
      context.emit('cancel')
      router.back()
    }
    const onRegister = () => {
      context.emit('register')
    }

    watch(props.modelValue, (newval, oldval) => {
      context.emit('update:modelValue', newval)
    })

    return {
      store,
      userinfo: props.modelValue,
      onCancel,
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
