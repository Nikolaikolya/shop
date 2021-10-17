<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand" href="#"
        >NoutService</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/" active-class="active"
              >Каталог</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about" active-class="active"
              >О компании</router-link
            >
          </li>
        </ul>

        <ul class="navbar-nav nav-user" v-if="!user">
          <li class="nav-item me-3">
            <button
              class="btn btn-primary"
              type="button"
              @click="openLoginPopup(true)"
            >
              Войти
            </button>
          </li>
          <li class="nav-item">
            <button
              class="btn btn-primary"
              type="button"
              @click="openRegisterPopup(true)"
            >
              Регистрация
            </button>
          </li>
        </ul>

        <ul class="navbar-nav nav-user" v-else>
          <li class="nav-item">
            <button class="btn btn-primary" type="button">Профиль</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  {{ user }}
</template>

<script>
import { inject } from "vue";
import { CLOSE_LOGIN_POPUP, CLOSE_REGISTER_POPUP } from "@/constants/Events";
import { mapGetters } from "vuex";
import { GET_USER } from "@/store/getter-types";
export default {
  name: "NavBar",
  setup() {
    const openLoginPopup = inject(CLOSE_LOGIN_POPUP);
    const openRegisterPopup = inject(CLOSE_REGISTER_POPUP);

    return { openLoginPopup, openRegisterPopup };
  },

  computed: {
    ...mapGetters({ user: GET_USER }),
  },
};
</script>

<style lang="scss">
.nav-user {
  margin-left: auto;
}
</style>
