import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store/index.js'

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

import { AddressEdit } from 'vant';
Vue.use(AddressEdit);
import { Area } from 'vant';
Vue.use(Area);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
