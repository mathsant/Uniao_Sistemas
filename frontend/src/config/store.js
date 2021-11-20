import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isMenuVisible: false,
    hasToken: false,
  },
  mutations: {
    toggleMenu(state, isVisible) {
      if (isVisible === undefined) {
        state.isMenuVisible = !state.isMenuVisible;
      } else {
        state.isMenuVisible = isVisible;
      }
    },
    verifyToken(state, tokenValidy) {
      if (localStorage.getItem("token").length <= 0) {
        console.log("teste 2");
        state.hasToken = false;
      }
      state.hasToken = true;
    },
    DEFINE_USER_LOGGED(state, { token, user }) {
      state.user = user;
      state.token = token;
    },
    DESLOG_USER(state) {
      state.token = null;
      state.user = {};
    },
  },
});
