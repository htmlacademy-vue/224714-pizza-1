import Vue from "vue";
import Router from "vue-router";
import routes from "@/router/routes";

Vue.use(Router);

export default new Router({
  linkExactActiveClass: "layout__link--active",
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
