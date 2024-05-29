import Vue from "vue";
import VueRouter from "vue-router";
import RouterPrefetch from "vue-router-prefetch";
import App from "./App";
import router from "./router/index";

import BlackDashboard from "./plugins/blackDashboard";
import i18n from "./i18n";

import { createPinia, PiniaVuePlugin } from 'pinia';

Vue.use(PiniaVuePlugin); // Adiciona o plugin Pinia para Vue 2
Vue.use(BlackDashboard);
Vue.use(VueRouter);
Vue.use(RouterPrefetch);

const pinia = createPinia();

new Vue({
  router,
  i18n,
  pinia,
  render: (h) => h(App),
}).$mount("#app");