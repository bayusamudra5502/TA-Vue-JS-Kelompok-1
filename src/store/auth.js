import Vue from "vue";
import { BASE_URL, USER_DEFAULT_ICON } from "../constant";

export default {
  namespaced: true,
  state: () => ({
    userToken: null,
    user: {},
  }),
  getters: {
    name: (state) => state.user?.name ?? null,
    email: (state) => state.user?.email ?? null,
    photoProfile: (state) =>
      state.user?.photo_profile
        ? `${BASE_URL}${state.user.photo_profile}`
        : USER_DEFAULT_ICON,
    isLogged: (state) => !!state.userToken,
  },
  mutation: {
    setUserToken(state, newToken) {
      state.userToken = newToken;
    },
    setUserObject(state, newObject) {
      state.user = newObject;
    },
  },
  action: {
    async setUser({ commit }, { token }) {
      const newData = await Vue.$auth.getUserDetails(token);

      if (newData) {
        commit("setUserToken", token);
        commit("setUserObject", newData);
      }
    },
    resetUser({ commit }) {
      commit("setUserToken", null);
      commit("setUserObject", {});
    },
  },
};
