import http from '@/utils/http'

const store = {
  namespaced: true,
  state: {
    center: [120.720362, 27.981844],
    zoom: 10,
    categories: [],
    store: [],
    stores: []
  },
  getters: {
    stores: state => {
      let stores = []
      state.data.map(type => {
        stores = stores.concat(type.stores)
      })

      return stores
    }
  },
  mutations: {
    setCategories(state, data) {
      state.categories = data
    },
    setZoom(state, zoom) {
      state.zoom = zoom
    },
    setCenter(state, location) {
      state.center = location
    },
    setStores(state, stores) {
      state.stores = stores
    },
    setStore(state, store) {
      state.store = store
    }
  },
  actions: {
    search(context, search) {
      const data = [{ id: 1, name: "专业市场", color: "#fff", stores: [{ id: 1, name: "建国正泰电器市场", location: [120.699409, 27.994292], color: '#f8403a', modules_id: 1 }, { id: 1, name: "建国正泰电器市场2", location: [120.415306, 27.996331], modules_id: 1 }] }];

      context.commit('setCategories', data);

      let stores = []
      data.map(category => {
        stores = stores.concat(category.stores)
      })

      stores.map(store => {
        store.events = {
          click: () => {
            context.dispatch('pin', store)
          }
        }
      })

      context.commit('setStores', stores);

      // http.get('/modules/index', search).then(data => {
      //   context.commit('setData', data)
      // }).catch(() => {})
    },
    pin(context, store) {
      context.commit('setStore', store)
      context.commit('setCenter', store.location)

      let zoom = 10;
      var timerId = setInterval(function () {
        if (zoom == 16) clearInterval(timerId)
        zoom += 1
        context.commit('setZoom', zoom)
      }, 10)

      const data = [
        { name: '龙福五金机电户外广告', location: [120.699409, 27.994292], color: '#ff8354' },
        { name: '南宁品牌体验馆', location: [120.698358, 27.993553], color: '#6179ff' },
        { name: 'SI专卖店', location: [120.700589, 27.994349], color: '#704a94' }
      ]

      context.commit('setStores', data);
    }
  }
}

export default store;