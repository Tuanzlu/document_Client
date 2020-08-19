import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.less";
import api from "./api/index.js";
import path from "./api/path.js";
Vue.config.productionTip = false;
Vue.use(Antd);
Vue.prototype.$api = api;
Vue.prototype.$urlPath = path;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
