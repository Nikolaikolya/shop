<template>
  <base-modals
    title="Вход на сайт"
    @close="$emit('close', false)"
    :isOpen="isOpen"
    :action="login"
  >
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">Емайл</label>
      <input
        type="email"
        class="form-control"
        id="exampleFormControlInput1"
        v-model="loginData.email"
        placeholder="name@example.com"
      />
    </div>
    <div class="mb-3">
      <label for="exampleFormControlTextarea1" class="form-label">Пароль</label>
      <input
        type="password"
        class="form-control"
        id="exampleFormControlTextarea1"
        v-model="loginData.password"
        placeholder="******"
      />
    </div>
  </base-modals>
</template>

<script>
import baseModals from "./base-modals/base-modals.vue";
import { mapActions } from "vuex";
import { REQUEST_AUTH } from "@/store/action-types";
export default {
  components: { baseModals },
  name: "LoginModal",
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loginData: {},
      user: null,
    };
  },
  methods: {
    ...mapActions({ reqLogin: REQUEST_AUTH }),
    async login() {
      const res = await this.reqLogin(this.loginData);
      if (res) this.$emit("close", false);
      // const dataAuth = await HTTP.post("api/auth", this.loginData);

      // const { success, tokens, user } = dataAuth.data;

      // if (success) {
      //   localStorage.setItem("access_token", tokens.access_token);
      //   localStorage.setItem("refresh_token", tokens.refresh_token);
      //   localStorage.setItem("user", JSON.stringify(user));
      // }

      // console.log(dataAuth);
    },
  },
};
</script>
