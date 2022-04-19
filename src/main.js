import Vue from 'vue'
import App from './App.vue'
import VueInteractJs from "vue-interactjs";

Vue.use(VueInteractJs);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')


