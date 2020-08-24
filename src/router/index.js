import Vue from "vue";
import AsyncComputed from "vue-async-computed";
import Router from "vue-router";
import UserLogin from "@/components/UserLogin";
import AdminHome from "@/components/AdminHome";
import RegisterUser from "@/components/RegisterUser";
import Logout from "@/components/Logout";
import NewOrder from "@/components/NewOrder";
import OrderHistory from "@/components/OrderHistory";
Vue.use(Router);
Vue.use(AsyncComputed);
/* eslint-disable */
export default new Router({
  routes: [
    {
      path: "/",
      name: "Login",
      component: UserLogin,
    },
    {
      path: "/AdminHome ",
      name: "AdminHome",
      component: AdminHome,
    },
    {
      path: "/NewOrder",
      name: "NewOrder",
      component: NewOrder,
    },
    {
      path: "/OrderHistory",
      name: "OrderHistory",
      component: OrderHistory,
    },
    {
      path: "/Register",
      name: "Register",
      component: RegisterUser,
    },
    {
      path: "/Logout",
      name: "Logout",
      component: Logout,
    },
  ],
});
