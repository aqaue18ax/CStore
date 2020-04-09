import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    stores: [],
    filter: [],
    //点击选中的门店
    selectStore: "",
    mapZoom: "",
    //竞品信息数据
    notice: []
}

const mutations = {
    SET_STORES (state, val) {
      state.stores = val
    },
    SET_FILTER (state, val) {
      state.filter = val
    },
    SET_SELECTSTORE (state, val) {
      state.selectStore = val
    },
    SET_MAPZOOM (state, val) {
      state.mapZoom = val
    },
    SET_NOTICE (state, notice) {
      state.notice = notice
    }
}

const actions = {
  setStores ({ commit }, stores) {
    commit('SET_STORES', stores)
  },
  setFilter ({ commit }, filter) {
    commit('SET_FILTER', filter)
  },
  setSelectStore ({ commit }, store) {
    commit('SET_SELECTSTORE', store)
  },
  setMapZoom ({ commit }, zoom) {
    commit('SET_MAPZOOM', zoom)
  },
  setNotice ({ commit }, notice) {
    commit('SET_NOTICE', notice)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
  }
})
