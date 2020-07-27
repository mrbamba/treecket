import Vue from 'vue'
import Vuex from 'vuex'

import userStore from '../modules/user.store.js';
import boardStore from '../modules/board.store.js';
import socketStore from '../modules/socket.store.js';
Vue.use(Vuex)

export default new Vuex.Store({
  strict: false,
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    userStore,
    boardStore,
    socketStore,
  }
})