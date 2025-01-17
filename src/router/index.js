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
    path: "/about",
    name: "About",
    component: () => import("../views/about.vue"),
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
    path: "/personInfo",
    name: "PersonInfo",
    component: () => import("../views/personalWorkplace/personInfo.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/personalWorkplace/register.vue"),
  },
  {
    path: "/singlemodel",
    name: "Singlemodel",
    component: () => import("../views/editDocument/singlemodel.vue"),
  },
  {
    path: "/personIndex",
    name: "PersonIndex",
    component: () => import("../views/personalWorkplace/personIndex.vue"),
    redirect: "/used",
    children: [
      {
        path: "/used",
        component: () => import("../views/personalWorkplace/personWork/used.vue"),
      },
      {
        path: "/own",
        component: () => import("../views/personalWorkplace/personWork/own.vue"),
      },
      {
        path: "/favorite",
        component: () => import("../views/personalWorkplace/personWork/favorite.vue"),
      },
      {
        path: "/letter",
        component: () => import("../views/personalWorkplace/personWork/letter.vue"),
      },
      {
        path: "/rubish",
        component: () => import("../views/personalWorkplace/personWork/rubish.vue"),
      },
      {
        path: "/table",
        component: () => import("../views/personalWorkplace/personWork/table.vue"),
      },
      {
        path: "/CoopTo",
        component: () => import("../views/personalWorkplace/personWork/coopTogether.vue"),
      },
      {
        path: "/team",
        component: () => import("../views/team/folder.vue"),
      },
      {
        path: "/addteam",
        component: () => import("../views/team/addTeam.vue"),
      },
      {
        path: "/team/memberlist",
        component: () => import("../views/team/userList.vue"),
      },
      {
        path: "/help",
        component: () => import("../views/help.vue"),
      },
    ],
  },
  {
    path: "/findPwd",
    name: "findPwd",
    component: () => import("../views/personalWorkplace/findPwd.vue"),
  },
  {
    path: "/help",
    name: "Help",
    component: () => import("../views/help.vue"),
  },
];

const router = new VueRouter({
  routes,
});
//控制访问权限
router.beforeEach((to, from, next) => {
  if (
    to.path === "/login" ||
    to.path === "/" ||
    to.path === "/register" ||
    to.path === "/about" ||
    to.path === "/index" ||
    to.path === "/findPwd"
  ) {
    console.log("2222");
    return next();
  } else {
    console.log("111111");
    window.sessionStorage.setItem("WebAdrs", window.location.href);
    const tokenStr = window.sessionStorage.getItem("UserId");
    if (!tokenStr) return next("/login");
    next();
  }
});
export default router;
