import Vue from 'vue'
import Vuex from 'vuex'

import develop from "./pages/develop/store";

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    develop
  },
  strict: debug
})
