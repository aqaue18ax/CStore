import api from "./api";

const state = {
  agencies: [],
  provinces: [],
  modules: [],

  market: {
    agency: 0,
    module: 1,
    province: 110000,
    statistics: [],
    provinces: []
  },
  newly: {
    agency: 0,
    module: 1,
    province: 110000,
    year: new Date().getFullYear(),
    statistics: [],
    provinces: []
  },
  sale: {
    agency: 0,
    province: 110000,
    year: new Date().getFullYear(),
    statistics: [],
    provinces: []
  },
  competitor: {
    agency: 0,
    module: 1,
    province: 110000,
    statistics: [],
    provinces: []
  }
}

const getters = {
  market: state => {
    return {
      agencies: state.agencies,
      modules: state.modules,
      provinces: state.market.provinces,
      statistics: state.market.statistics
    }
  },
  newly: state => {
    return {
      agencies: state.agencies,
      modules: state.modules,
      provinces: state.newly.provinces,
      statistics: state.newly.statistics
    }
  },
  sale: state => {
    return {
      agencies: state.agencies,
      provinces: state.sale.provinces,
      statistics: state.sale.statistics,
    }
  },
  competitor: state => {
    return {
      agencies: state.agencies,
      modules: state.modules,
      provinces: state.competitor.provinces,
      statistics: state.competitor.statistics
    }
  }
}

const actions = {
  async init({ state, commit, dispatch }) {
    if (!state.agencies.length) {
      await api.agency().then(data => {
        commit('agency', data)
      })
    }

    if (!state.provinces.length) {
      await api.province(state.agencies[0].id).then(data => {
        commit('province', data)
      })
    }

    if (!state.modules.length) {
      await api.module().then(data => {
        commit('module', data)
      })
    }

    dispatch('market')
    dispatch('newly')
    dispatch('sale')
    dispatch('competitor')
  },

  async market({ state, commit }, params = { type: 'statistics' }) {
    const { province, module, agency } = state.market;
    await api.markey(province, module, agency).then(data => {
      data.sort((a, b) => {
        return b.value - a.value
      })

      data.type = params.type
      commit('market', data);
    })
  },

  async newly({ state, commit }, params = { type: 'statistics' }) {
    const { province, module, agency, year } = state.newly;
    await api.newly(province, module, agency, year).then(data => {
      data.sort((a, b) => {
        return b.value - a.value
      })

      data.type = params.type
      commit('newly', data);
    })
  },

  async sale({ state, commit }, params = { type: 'statistics' }) {
    const { province, agency, year } = state.sale;
    await api.sale(province, agency, year).then(data => {
      data.sort((a, b) => {
        return b.value - a.value
      })

      data.type = params.type
      commit('sale', data);
    })
  },

  async competitor({ state, commit }, params = { type: 'statistics' }) {
    const { province, agency, module } = state.competitor;
    await api.competitor(province, agency, module).then(data => {
      data.sort((a, b) => {
        return b.value - a.value
      })

      data.type = params.type
      commit('competitor', data);
    })
  },

  async change({ dispatch, commit }, params) {
    await commit('change', params)

    const key = params.key;
    if (params.type == 'agency') {
      await api.province(params.id).then(data => {
        if (data.length == 0) data = [{ code: 0, name: '未绑定' }]
        data.type = 'provinces'
        commit(key, data)
        commit('change', {type: 'province', key, code: data[0].code})
      })
    }

    await dispatch(key)
  }
}

const mutations = {
  agency(state, data) {
    state.agencies = data;
  },
  province(state, data) {
    state.market.provinces = data;
    state.newly.provinces = data;
    state.sale.provinces = data;
    state.competitor.provinces = data;
  },
  module(state, data) {
    state.modules = data;
  },

  market(state, data) {
    const type = data.type
    delete data.type
    state.market[type] = data
  },
  newly(state, data) {
    const type = data.type
    delete data.type
    state.newly[type] = data
  },
  sale(state, data) {
    const type = data.type
    delete data.type
    state.sale[type] = data
  },
  competitor(state, data) {
    const type = data.type
    delete data.type
    state.competitor[type] = data
  },

  change(state, data) {
    state[data.key][data.type] = data.value || data.code || data.id
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}