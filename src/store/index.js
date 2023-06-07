import { createStore } from 'vuex'
import ModuleUser from './user'
import ModuleZone from './zone'
export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user:ModuleUser,
    zone:ModuleZone
  }
})
