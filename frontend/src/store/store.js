import Vue from 'vue';
import Vuex from 'vuex';

// import { userStore } from './user.store.js';
import { socketStore } from './socket.store.js';
import { reviewStore } from './review.store.js';
import { boardStore } from './board.store.js';
import { boardService } from '../services/board.service.js';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export const store = new Vuex.Store({
  strict: debug,
  modules: {
    // userStore,
    socketStore,
    reviewStore,
    boardStore
  },
  state: {
    boards: null
  },
  mutations: {
    setBoards(state, { boards }) {
      state.boards = boards;
    }
  },
  actions: {
    async loadBoards({ commit }) {
      try {
        const boards = await boardService.getBoards();
        commit({ type: 'setBoards', boards });
      } catch (err) {
        console.log('cannot load boards', err);
      }
    }
  }
});
