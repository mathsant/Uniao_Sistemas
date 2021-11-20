import Vue from "vue";
import VueHtmlToPaper from "vue-html-to-paper";

const options = {
  name: "_blank",
  spec: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
  styles: [
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
    "https://unpkg.com/kidlat-css/css/kidlat.css",
    "public/landscape.css",
  ],
  timeout: 1000,
  autoClose: true,
  windowTitle: window.document.title,
};

Vue.use(VueHtmlToPaper, options);
Vue.use(VueHtmlToPaper);
