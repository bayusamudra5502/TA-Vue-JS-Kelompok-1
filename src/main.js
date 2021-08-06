import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/API";
import "./plugins/element.js";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
  async created() {
    const loading = this.$loading({
      lock: true,
      text: "Loading",
    });

    const data = this.$auth.lastSessionData();

    if (data) {
      this.$store.dispatch("auth/setUser", {
        token: data.token,
        data: {
          photo_profile: data.photo_profile,
        },
      });

      if (await this.$auth.isLogged()) {
        const userObj = await this.$auth.getUserDetails();
        this.$store.dispatch("auth/setUser", {
          token: data.token,
          data: userObj,
        });
      }
    }

    loading.close();
  },
}).$mount("#app");
