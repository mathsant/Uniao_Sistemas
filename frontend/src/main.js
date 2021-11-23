import "font-awesome/css/font-awesome.css";
import Vue from "vue";
import VueTheMask from "vue-the-mask";
import App from "./App";
import store from "./config/store";
import "./config/msgs";
import router from "./config/router";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "./config/bootstrap";
Vue.config.productionTip = false;
import http from "./http";
Vue.prototype.$http = http;

Vue.use(VueSweetalert2);
Vue.use(VueTheMask);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
