<template>
  <div></div>
</template>

<script>
import { store } from "../helpers/store.js";
export default {
  name: "Logout",
  created() {
    store.clearAdmin();
    store.clearSession();
    this.$router.push({ name: "Login" });
  },
};
</script>
