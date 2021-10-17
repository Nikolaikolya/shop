<template>
  <nav-bar />
  <router-view />

  <p @click="isOpenLogin = true">Test</p>
  <login-modal @close="isOpenLogin = false" :isOpen="isOpenLogin" />
  <rigester-modal @close="isOpenRegister = false" :isOpen="isOpenRegister" />
</template>

<script>
import LoginModal from "@/components/modals/login-modal.vue";
import RigesterModal from "./components/modals/rigester-modal.vue";

import NavBar from "./components/nav-bar/nav-bar.vue";
import { ref, provide } from "vue";
import {
  SHOW_LOGIN_POPUP,
  CLOSE_LOGIN_POPUP,
  SHOW_REGISTER_POPUP,
  CLOSE_REGISTER_POPUP,
} from "@/constants/Events";
export default {
  components: { NavBar, LoginModal, RigesterModal },
  setup() {
    const isOpenLogin = ref(false);
    const isOpenRegister = ref(false);

    const updateOpenLogin = (value) => (isOpenLogin.value = value);
    const updateOpenRegister = (value) => (isOpenRegister.value = value);

    provide(CLOSE_LOGIN_POPUP, updateOpenLogin);
    provide(SHOW_LOGIN_POPUP, isOpenLogin);
    provide(SHOW_REGISTER_POPUP, isOpenRegister);
    provide(CLOSE_REGISTER_POPUP, updateOpenRegister);

    return { isOpenLogin, isOpenRegister };
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
