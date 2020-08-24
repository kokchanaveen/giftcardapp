<template>
  <div>
    <h2>Login</h2>

    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <div v-show="submitted && !userFound">
          <span style="color:red">
            Invalid Username/Password provided. Please retry</span
          >
        </div>
        <label for="username">Username</label>
        <input
          type="text"
          v-model="username"
          name="username"
          class="form-control"
          :class="{ 'is-invalid': submitted && !username }"
        />
        <div v-show="submitted && !username" class="invalid-feedback">
          Username is required
        </div>
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
        <div v-show="submitted && !password" class="invalid-feedback">
          Password is required
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary">
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script>
/*eslint-disable no-unused-vars*/
import axios from "axios";
import userservice from "../services/userservice.js";
import { store } from "../helpers/store.js";
export default {
  name: "UserLogin",
  data() {
    return {
      userFound: false,
      username: "",
      password: "",
      submitted: false,
      userData: [],
      baseUrl: process.env.VUE_APP_BASE_URL,
    };
  },
  created() {
    userservice
      .getAllUsers()
      .then((data) => {
        this.userData = data;
        console.log(data); // now the data is accessable from here.
      })
      .catch(function(response) {
        console.log(response);
      });
    store.clearAdmin();
    store.clearSession();
  },
  methods: {
    handleSubmit(e) {
      this.submitted = true;
      console.log(store.state.adminCollection.length);
      const { username, password } = this;
      if (username && password) {
        this.userData.forEach((user) => {
          if (user.userName === username && user.password === password) {
            this.userFound = true;
            store.addSession(user.userName);
            if (user.admin === "1") {
              store.addAdmin(true);
              this.$router.push({ name: "AdminHome" });
            } else {
              this.$router.push({ name: "NewOrder" });
            }
          } else {
            this.userFound = false;
            store.clearAdmin();
            store.clearSession();
            console.log(this.userFound);
          }
        });
      }
    },
  },
};
</script>
