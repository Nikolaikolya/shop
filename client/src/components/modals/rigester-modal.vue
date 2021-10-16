<template>
  <base-modals
    title="Вход на сайт"
    @close="$emit('close', false)"
    :isOpen="isOpen"
    :action="login"
  >
    <div class="mb-3">
      <label for="name" class="form-label">Имя</label>
      <input
        type="text"
        class="form-control"
        id="name"
        v-model="registrationData.name"
        placeholder="Nikolai"
      />
    </div>
    <div class="mb-3">
      <label for="surname" class="form-label">Телефон</label>
      <input
        type="text"
        class="form-control"
        id="surname"
        v-model="registrationData.phone"
        placeholder="name@example.com"
      />
    </div>
    <div class="mb-3">
      <label for="email" class="form-label">Емайл</label>
      <input
        type="email"
        class="form-control"
        id="email"
        v-model="registrationData.email"
        placeholder="name@example.com"
      />
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Пароль</label>
      <input
        type="password"
        class="form-control"
        id="password"
        v-model="registrationData.password"
        placeholder="******"
      />
    </div>
    <div class="mb-3">
      <label for="formFile" class="form-label">Аватар</label>
      <input
        class="form-control"
        ref="avatar"
        type="file"
        id="formFile"
        @change="loadFile"
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
  name: "RegisterModal",
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      registrationData: {},
      user: null,
    };
  },
  methods: {
    ...mapActions({ reqLogin: REQUEST_AUTH }),
    async login() {
      const res = await this.reqLogin(this.loginData);
      if (res) this.$emit("close", false);
    },
  },
};
</script>
