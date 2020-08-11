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
  /*
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
    path: "/personInfo",
    name: "PersonInfo",
    component: () => import("../views/personalWorkplace/personInfo.vue"),
  },*/
  {
    path: "/manage",
    name: "Manage",
    component: () => import("../views/team/manage.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
