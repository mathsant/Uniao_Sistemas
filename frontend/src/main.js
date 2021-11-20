import "font-awesome/css/font-awesome.css";
import Vue from "vue";
import VueTheMask from "vue-the-mask";
import App from "./App";
import store from "./config/store";
import "./config/msgs";
import router from "./config/router";

import "./config/bootstrap";
Vue.config.productionTip = false;
import http from "./http";

Vue.prototype.$http = http;

import VueHtmlToPaper from "vue-html-to-paper";

const options = {
  name: "_blank",
  spec: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
  styles: [
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
    "https://unpkg.com/kidlat-css/css/kidlat.css",
  ],
  timeout: 1000,
  autoClose: true,
  windowTitle: window.document.title,
};

Vue.use(VueHtmlToPaper, options);
Vue.use(VueHtmlToPaper);
Vue.use(VueTheMask);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
