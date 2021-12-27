import Vue from 'vue'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueKonva from "vue-konva";
import VueImg from "v-img";
import moment from "moment";
import converter from "number-to-words";
import InfiniteLoading from "vue-infinite-loading";
import Vuelidate from "vuelidate";
import "./registerServiceWorker";

Vue.use(VueImg);
Vue.use(VueKonva);
Vue.use(InfiniteLoading);
Vue.use(Vuelidate);

Vue.config.productionTip = false;

Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("D-MMM, YYYY");
  }
});
Vue.filter("toWords", function(value) {
  if (!value) return "";
  return converter.toWords(value);
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
