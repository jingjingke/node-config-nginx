import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import qs from "qs";

Vue.config.productionTip = false;

Vue.component("nginxWrap", () => import("./components/nginx/wrap.vue"));
Vue.component("nginxItem", () => import("./components/nginx/item.vue"));
Vue.component("nginxPopup", () => import("./components/nginx/popup.vue"));
Vue.component("nginxBtns", () => import("./components/nginx/btns.vue"));

let requestHeader = {};

// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
  (config) => {
    if (config.requestHeader === "json") {
      config.headers = Object.assign(
        config.headers || {},
        requestHeader || {},
        {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/json;charset:utf-8",
        }
      );
      if (config.method === "post") {
        // 序列化
        config.data = JSON.stringify(config.data);
      }
    } else {
      config.headers = Object.assign(
        config.headers || {},
        requestHeader || {},
        {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/x-www-form-urlencoded",
        }
      );
      if (config.method === "post") {
        // 序列化
        config.data = qs.stringify(config.data);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
