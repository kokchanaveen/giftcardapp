<template>
  <div>
    <Navigation></Navigation>
    <h2>Login</h2>

    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <div v-show="submitted && showInvalid">
          <span style="color:red">Invalid Username/Password provided. Please retry</span>
        </div>
        <label for="username">Username</label>
        <input
          type="text"
          v-model="username"
          name="username"
          class="form-control"
          :class="{ 'is-invalid': submitted && !username }"
        />
        <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          v-model="password"
          name="password"
          class="form-control"
          :class="{ 'is-invalid': submitted && !password }"
        />
        <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
/*eslint-disable no-unused-vars*/
import axios from "axios";
import userservice from "../services/userservice.js";
import { store } from "../helpers/store.js";
import Navigation from "@/components/Navigation";
export default {
  name: "UserLogin",
  components: { Navigation },
  data() {
    return {
      userFound: false,
      username: "",
      password: "",
      submitted: false,
      userData: [],
      baseUrl: process.env.VUE_APP_BASE_URL,
      showInvalid: false,
    };
  },
  created() {
    userservice
      .getAllUsers()
      .then((data) => {
        this.userData = data;
        console.log(data); // now the data is accessable from here.
      })
      .catch(function (response) {
        console.log(response);
      });
    store.clearAdmin();
    store.clearSession();
  },
  methods: {
    handleSubmit(e) {
      this.submitted = true;
      const { username, password } = this;
      if (username && password) {
        for (var i = 0; i < this.userData.length; i++) {
          var user = this.userData[i];
          if (user.userName === username && user.password === password) {
            this.userFound = true;
            store.addSession(user.userName);
            if (user.admin === "1") {
              store.addAdmin(true);
              this.$router.push({ name: "AdminHome" });
            } else {
              this.$router.push({ name: "NewOrder" });
            }
            break;
          }
        }

        if (!this.userFound) {
          /* for each else block */
          this.userFound = false;
          this.showInvalid = true;
          store.clearAdmin();
          store.clearSession();
        }
      }
    },
  },
};
</script>
