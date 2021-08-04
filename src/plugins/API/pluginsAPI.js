import auth from "./lib/auth";
import blog from "./lib/blog";

export default {
  install(vue) {
    vue.prototype.$auth = auth;
    vue.prototype.$blog = blog;
  },
};
