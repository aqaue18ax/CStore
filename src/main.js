import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAMap from 'vue-amap';
import http from './utils/http'
import { ImagePreview, Popup, Picker, Icon, Area } from 'vant';

Vue.use(VueAMap);

Vue.prototype.$http = http;

Vue.use(Icon);
Vue.use(Area);
Vue.use(Popup);
Vue.use(Picker);
Vue.use(ImagePreview);


VueAMap.initAMapApiLoader({
  key: '124ac7da3c120c5129671386c225180f',
  plugin: ['AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.ElasticMarker'],
  uiVersion: '1.0.11',
  v: '1.4.4'
});

Vue.config.productionTip = false

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

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
      range: [],
      stores: [],
      center: JSON.parse(localStorage.getItem("lat&lng")) || [120.670856, 28.000986],
      zoom: 14,
    }
  },
  methods: {},
  router,
  render: h => h(App)
}).$mount('#app')
