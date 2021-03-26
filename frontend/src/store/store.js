import Vue from 'vue';
import Vuex from 'vuex';

import { userStore } from './user.store.js';
import { socketStore } from './socket.store.js';
import { reviewStore } from './review.store.js';
import { boardStore } from './board.store.js';
import { boardService } from '../services/board.service.js';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export const store = new Vuex.Store({
  strict: debug,
  modules: {
    userStore,
    socketStore,
    reviewStore,
    boardStore
  },
  state: {
    boards: null
  },
  getters: {
    boards(state) {
      return state.boards;
    }
  },
  mutations: {
    setBoards(state, { boards }) {
      state.boards = boards;
    },
    removeBoardFromList(state, { boardId }) {
      console.log(state.boards);
      const boardIdx = state.boards.findIndex(({ _id }) => _id === boardId);
      state.boards.splice(boardIdx, 1);
    }
  },
  actions: {
    async loadBoards({ commit }) {
      try {
        const boards = await boardService.query();
        commit({ type: 'setBoards', boards });
      } catch (err) {
        console.log('cannot load boards', err);
      }
    }
  }
});
