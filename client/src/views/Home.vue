<template>
  <div class="home"></div>
  <login-modal />
</template>

<script>
import LoginModal from "../components/modals/login-modal.vue";
// @ is an alias to /src

export default {
  name: "Home",
  title: "Test",
  components: { LoginModal },
};
</script>
