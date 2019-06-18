import Vue from 'vue'
import Vuex from 'vuex'
import user from "@/store/modules/user";
import map from "@/store/modules/map";

Vue.use(Vuex)

// import router from './router'
// import http from '@/utils/http'
// import { Toast } from "vant";

export default new Vuex.Store({
  // state: {
  //   // roles: [],
  //   // store: {},
  //   // stores: [],
  //   // pullUpReload: true,
  //   // modules: []
  // },
  modules: {
    map,
    user
  }

  // mutations: {
  //   getUser(state, user) {
  //     state.user = user
  //   },
  //   getRoles(state, roles) {
  //     state.roles = roles
  //   },
  //   postAudit(state) {
  //     state.user.audit_status = 3
  //   },
  //   editAvatar(state, url) {
  //     state.user.headimg_url = url
  //   },
  //   getModules(state, data) {
  //     state.modules = data
  //   },
  //   getStores(state, res) {
  //     state.pullUpReload = res.current_page != res.last_page
  //     state.stores = res.data
  //   },
  //   clearStores(state) {
  //     state.pullUpReload = true 
  //     state.stores = []
  //   },
  //   getStore(state, data) {
  //     state.store = data
  //   },
  //   clearStore(state) {
  //     state.store = {}
  //   }
  // },
  // actions: {
  //   getUser(context) {
  //     if (context.state.user.id) return
  //     http.get("/users/read").then(res => {
  //       context.commit('getUser', res)
  //     }).catch(() => { });
  //   },
  //   getRoles(context) {
  //     if (context.state.roles.length) return
  //     http.get("/roles").then(res => {
  //       context.commit('getRoles', res)
  //     }).catch(() => { });
  //   },
  //   postAudit(context, data) {
  //     http.post("/users/update", data).then(() => {
  //       context.commit('postAudit');
  //       router.replace(`/user`);
  //     }).catch(() => { });
  //   },
  //   uploadAvatar(context, data) {
  //     let name = Date.parse(new Date()) + Math.random().toString().slice(-6) + '.' + data.file.name.split('.').pop();

  //     http.file('/files/upload', { file: data.file, name }).then(key => {
  //       http.post('/files/save', { key }).then(id => {
  //         http.get(`/files/read/id/${id}`).then(data => {
  //           context.commit('editAvatar', data.domain + data.key)
  //         }).catch(() => { })

  //         http.post(`/users/updateHeadimg`, { headimg_file_id: id }).then(() => {
  //           Toast({
  //             message: '更新成功'
  //           })
  //         }).catch(() => { })
  //       }).catch(() => { })
  //     }).catch(() => { })
  //   },
  //   getModules(context) {
  //     if (context.state.modules.length) return
  //     http.get('/modules/index').then(data => {
  //       context.commit('getModules', data)
  //     }).catch(() => { })
  //   },
  //   getStores(context, module_id) {
  //     http.get('/stores/index', {params: {module_id}}).then(res => {
  //       context.commit('getStores', res)
  //     }).catch(() => {})
  //   },
  //   clearStores(context) {
  //     context.commit('clearStores')
  //   },
  //   getStore(context, id) {
  //     http.get(`/stores/read/id/${id}`).then(data => {
  //       context.commit('getStore', data)
  //     }).catch(() => {})
  //   },
  //   clearStore(context) {
  //     context.commit('clearStore')
  //   }
  // }
})
