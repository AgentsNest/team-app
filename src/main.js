import Vue from 'vue'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueKonva from "vue-konva";
import VueImg from "v-img";
import VueClipboard from "vue-clipboard2";
import moment from "moment";

Vue.use(VueClipboard);
Vue.use(VueImg);
Vue.use(VueKonva);

Vue.config.productionTip = false;

Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("D-MMM, YYYY");
  }
});
Vue.filter("fromNow", function(value) {
  if (value) {
    return moment(String(value)).fromNow();
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
