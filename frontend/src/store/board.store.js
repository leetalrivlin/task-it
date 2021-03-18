import { boardService } from '../services/board.service';
import {
  socketService,
  SOCKET_EMIT_USER_WATCH,
  SOCKET_EVENT_USER_UPDATED
} from '../services/socket.service';
const clone = require('rfdc')({ proto: true });

// var localLoggedinUser = null;
// if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user || null);

export const boardStore = {
  state: {
    board: null,
    group: null,
    task: null
  },
  getters: {
    board(state) {
      return state.board;
    },
    task(state) {
      return state.task;
    }
  },
  mutations: {
    setBoard(state, { board }) {
      state.board = board;
    },
    setTask(state, { task }) {
      state.task = task;
    },
    setTaskById(state, { taskId }) {
      state.board.groups.forEach(group => {
        group.tasks.forEach(task => {
          if (task.id === taskId) {
            state.task = task;
            state.group = group;
          }
        });
      });
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
    async updateBoard({ commit }, { board }) {
      try {
        commit({ type: 'setBoard', board });
        const updatedBoard = await boardService.updateBoard(board);
        console.log(updatedBoard);
      } catch (err) {
        console.log('cant update board', err);
      }
    },

    async updateTask({commit, dispatch, state}, { task }) {
      try {
        commit({ type: 'setTask', task });
        // commit('updateTaskInBoard');
        const boardCopy = clone(state.board);
        const groupCopy = clone(state.group);
        const taskIdx = groupCopy.tasks.findIndex(
          ({ id }) => id === task.id
        );
        const groupIdx = boardCopy.groups.findIndex(
          ({ id }) => id === groupCopy.id
        );
        groupCopy.tasks.splice(taskIdx, 1, task);
        boardCopy.groups.splice(groupIdx, 1, groupCopy);
        dispatch({type: 'updateBoard', board: boardCopy})
      } catch (err) {
        console.log('cannot update task', err);
      }
    }
  }
};
