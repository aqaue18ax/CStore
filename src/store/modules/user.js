import http from '@/utils/http'

export default {
  namespaced: true,
  state: {
    data: {
      name: '',
      address: '',
      email: ''
    },
    roles: []
  },
  getters: {},
  mutations: {
    setUser(state, data) {
      state.user = data
    }
  },
  actions: {
    getUser(context) {
      if (context.state.data.id) return
      http.get("/user").then(data => {
        context.commit('setUser', data)
      });
    }
  }
}