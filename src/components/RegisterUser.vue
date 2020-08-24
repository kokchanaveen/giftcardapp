<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          v-model="username"
          name="username"
          class="form-control"
          :class="{ 'is-invalid': submitted && !username }"
        />
        <div v-show="submitted && !username" class="invalid-feedback">
          UserName is required
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
        <label for="confirmPassword">Confrim Password</label>
        <input
          type="password"
          v-model="confirmPassword"
          name="confirmPassword"
          class="form-control"
          :class="{ 'is-invalid': submitted && !confirmPassword }"
        />
        <div v-show="submitted && !confirmPassword" class="invalid-feedback">
          Confirm Password is required
        </div>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="text"
          v-model="email"
          name="email"
          class="form-control"
          :class="{ 'is-invalid': submitted && !email }"
        />
        <div v-show="submitted && !email" class="invalid-feedback">
          Email is required
        </div>
        <div class="form-group">
          <div>
            <label for="admin">Is Admin</label>
            <input
              type="checkbox"
              v-model="admin"
              name="admin"
              class="form-control"
              :class="{ 'is-invalid': submitted && !admin }"
            />
          </div>

          <div v-show="submitted && !admin" class="invalid-feedback">
            Is Admin is required
          </div>
        </div>
      </div>

      <div class="form-group">
        <button class="btn btn-primary">
          Register
        </button>
        <router-link to="/" class="btn btn-link">Cancel</router-link>
      </div>
    </form>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState, mapActions } from "vuex";
import userservice from "../services/userservice.js";
export default {
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      admin: "",
      submitted: false,
    };
  },
  methods: {
    handleSubmit(e) {
      this.submitted = true;
      var isAdmin;
      const { username, password, email, confirmPassword, admin } = this;
      if (admin) {
        isAdmin = "1";
      } else {
        isAdmin = "0";
      }
      if (username && password && email && confirmPassword) {
        userservice
          .createUser(username, password, email, isAdmin)
          .then((data) => {
            console.log(data); // now the data is accessable from here.
            this.$router.push({ name: "Login" });
          })
          .catch(function(response) {
            console.log(response);
          });
      }
    },
  },
};
</script>
