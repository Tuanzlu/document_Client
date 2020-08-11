import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/home.vue"),
  },
  {
    path: "/model",
    name: "Model",
    component: () => import("../views/editDocument/model.vue"),
  },
  {
    path: "/document",
    name: "Document",
    component: () => import("../views/editDocument/document.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/personalWorkplace/login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/personalWorkplace/register.vue"),
  },
  {
    path: "/personIndex",
    name: "PersonIndex",
    component: () => import("../views/personalWorkplace/personIndex.vue"),
  },
  {
    path: "/index",
    name: "Index",
    component: () => import("../views/personalWorkplace/index.vue"),
    path: "/about",
    name: "About",
    component: () => import("../views/about.vue"),
  },
  {
    path: "/singlemodel",
    name: "Singlemodel",
    component: () => import("../views/editDocument/singlemodel.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
