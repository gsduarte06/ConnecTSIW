import Vue from "vue";
import VueRouter from "vue-router";
import RouterPrefetch from "vue-router-prefetch";
import App from "./App";
// TIP: change to import router from "./router/starterRouter"; to start with a clean layout
import router from "./router/index";

import { createPinia, PiniaVuePlugin } from 'pinia';

import BlackDashboard from "./plugins/blackDashboard";
import i18n from "./i18n";

Vue.use(BlackDashboard);
Vue.use(VueRouter);
Vue.use(RouterPrefetch);
Vue.use(PiniaVuePlugin);

const pinia = createPinia();

new Vue({
  router,
  i18n,
  pinia,
  render: (h) => h(App),
}).$mount("#app");