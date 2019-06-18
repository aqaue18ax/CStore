import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAMap from 'vue-amap';
import http from './utils/http'
// import VueEvents from 'vue-event-handler';

Vue.prototype.$http = http;
// Vue.use(VueEvents)
Vue.use(VueAMap);

VueAMap.initAMapApiLoader({
  key: '124ac7da3c120c5129671386c225180f',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType'],
  v: '1.4.4'
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
