<template>
  <div>
    <!-- navbar -->
    <div class="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
      <div class="container">
        <router-link to="/" class="navbar-brand" v-if="!showLogout">Login</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link
                tag="li"
                active-class="active"
                class="nav-link"
                to="/Register"
                v-if="!showLogout"
              >Register</router-link>
            </li>
            <li class="nav-item">
              <router-link
                tag="li"
                active-class="active"
                class="nav-link"
                to="/AdminHome"
                v-if="userAdmin && showLogout"
              >Admin Home</router-link>
            </li>
            <li class="nav-item">
              <router-link
                tag="li"
                active-class="active"
                class="nav-link"
                to="/AdminMonthlyReport"
                v-if="userAdmin && showLogout"
              >Admin Monthly Report</router-link>
            </li>
            <li class="nav-item">
              <router-link
                tag="li"
                active-class="active"
                class="nav-link"
                to="/NewOrder"
                v-if="!userAdmin && showLogout"
              >New Order</router-link>
            </li>
            <li class="nav-item">
              <router-link
                tag="li"
                active-class="active"
                class="nav-link"
                to="/OrderHistory"
                v-if="!userAdmin && showLogout"
              >Order History</router-link>
            </li>
            <li class="nav-item" v-if="showLogout">
              <router-link tag="li" active-class="active" class="nav-link" to="/Logout">Logout</router-link>
            </li>
          </ul>
        </div>
        <div v-if="showLogout" style="float: right;" class="navbar-item">
          <span class="nav-item">Logged in User:&emsp;</span>
          <strong>{{ loggedInUser }}</strong>
          &emsp;
          <span class="nav-item">UserMode:&emsp;</span>
          <strong>{{ userMode }}</strong>
        </div>
      </div>
    </div>

    <div class="container">
      <transition name="moveInUp">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import { store } from "../helpers/store.js";
export default {
  name: "Navigation",
  computed: {
    userAdmin: function () {
      if (store.state.isAdmin) {
        return true;
      } else {
        return false;
      }
    },
    userMode: function () {
      if (store.state.isAdmin) {
        return " Administrator";
      } else {
        return "Regular User";
      }
    },

    loggedInUser: function () {
      console.log(store.state.userSession[0]);
      return store.state.userSession[0];
    },

    showLogout: function () {
      console.log(store.state.userSession.length);
      return store.state.userSession.length;
    },
  },
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.moveInUp-enter-active {
  animation: fadeIn 1s ease-in;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

.moveInUp-leave-active {
  animation: moveInUp 0.1s ease-in;
}
@keyframes moveInUp {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-400px);
  }
}
</style>
