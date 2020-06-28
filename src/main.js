import Vue from "vue";
import App from "./App.vue";
import net from "./net.js";

Vue.prototype.$net = net;

Vue.config.productionTip = false;

Vue.component("nginxWrap", () => import("./components/nginx/wrap.vue"));
Vue.component("nginxItem", () => import("./components/nginx/item.vue"));
Vue.component("nginxPopup", () => import("./components/nginx/popup.vue"));
Vue.component("nginxBtns", () => import("./components/nginx/btns.vue"));

new Vue({
  render: (h) => h(App),
}).$mount("#app");
