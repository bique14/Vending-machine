// ./router.js

import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "account-with-id",
      component: () => import("./pages/index.vue"),
    },
    {
      path: "/vending/",
      name: "account-with-id",
      component: () => import("./views/vending.vue"),
    },
  ],
});
