<template>
  <div>
    <Navigation></Navigation>
  </div>
</template>

<script>
import { store } from "../helpers/store.js";
import Navigation from "@/components/Navigation";
export default {
  name: "Logout",
  components: { Navigation },
  created() {
    store.clearAdmin();
    store.clearSession();
    this.$router.push({ name: "Login" });
  },
};
</script>
