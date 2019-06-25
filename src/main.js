import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAMap from 'vue-amap';
import http from './utils/http'

Vue.prototype.$http = http;
Vue.use(VueAMap);

VueAMap.initAMapApiLoader({
  key: '124ac7da3c120c5129671386c225180f',
  plugin: ['AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.ElasticMarker'],
  uiVersion: '1.0.11',
  v: '1.4.4'
});

Vue.config.productionTip = false

new Vue({
  data() {
    return {
      logo: true,
      user: {
        name: '',
        address: '',
        email: '',
        role: { modules: [] }
      },
      stores: [],
      center: JSON.parse(localStorage.getItem("lat&lng")) || [120.670856, 28.000986],
      zoom: 12
    }
  },
  methods: {},
  router,
  render: h => h(App)
}).$mount('#app')
