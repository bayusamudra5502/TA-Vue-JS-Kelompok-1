import Vue from "vue";
import VueRouter from "vue-router";
import { Message } from "element-ui";
import { isLogged } from "../plugins/API/lib/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
    meta: {
      isAuthDisallowed: true,
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Register.vue"),
    meta: {
      isAuthDisallowed: true,
    },
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/posts/add",
    name: "AddBlog",
    component: () => import("../views/AddArticle.vue"),
    meta: {
      isAuthRequired: true,
    },
  },
  {
    path: "/posts/:id/edit",
    name: "EditBlog",
    component: () => import("../views/ArticleEdit.vue"),
    meta: {
      isAuthRequired: true,
    },
  },
  {
    path: "/posts/:id",
    name: "Article",
    component: () => import("../views/ArticlePost.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.isAuthDisallowed)) {
    if (await isLogged()) {
      Message.info({ message: "Saat ini anda sudah login", showClose: true });
      next("/");
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.isAuthRequired)) {
    if (await isLogged()) {
      next();
    } else {
      Message.error({
        message: "Anda Harus login terlebih dahulu",
        showClose: true,
      });
      next("/");
    }
  } else {
    next();
  }
});

export default router;
