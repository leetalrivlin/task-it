import { boardService } from '../services/board.service';
import {
  socketService,
  SOCKET_EMIT_USER_WATCH,
  SOCKET_EVENT_USER_UPDATED,
} from '../services/socket.service';

// var localLoggedinUser = null;
// if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user || null);

export const boardStore = {
  state: {
    board: null,
    task: null,
  },
  getters: {
    board(state) {
      return state.board;
    },
  },
  mutations: {
    setBoard(state, { board }) {
      state.board = board;
    },
    setTask(state, { task }) {
      state.task = task;
    }
  },
  actions: {
    async loadBoard({ commit }, { boardId }) {
      try {
        const board = await boardService.getById(boardId);
        commit({ type: 'setBoard', board });
        // socketService.emit('watch-board', boardId) // join('u101')
        // socketService.off('board-updated')
        // socketService.on('board-updated', board => {
        //     commit({ type: 'setBoard', board })
        // })
        // socketService.on('task-updated', task => {
        //     commit({ type: 'saveTask', task })
        // })
      } catch (err) {
        console.log('boardStore: Error in loadBoard', err);
        throw err;
      }
    },
    async loadTask({ commit }, { boardId, groupId, taskId }) {
      try {
        console.log('taskId',taskId);
        const task = await boardService.getTaskById(boardId, groupId, taskId);
        commit({ type: 'setTask', task });
      } catch(err) {
        console.log('cannot load task',err);
      }
    }
  },
};
