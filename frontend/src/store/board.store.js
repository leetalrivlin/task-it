import { boardService } from '../services/board.service';
import { socketService } from '../services/socket.service';
const clone = require('rfdc')({ proto: true });

// var localLoggedinUser = null;
// if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user || null);

export const boardStore = {
  state: {
    board: null,
    task: null,
    users: null
  },
  getters: {
    board(state) {
      return state.board;
    },
    boardLabels(state) {
      return state.board.labels;
    },
    group(state) {
      if (!state.board || !state.task) return;
      return state.board.groups.find(group =>
        group.tasks.some(({ id }) => id === state.task.id)
      );
    },
    task(state) {
      return state.task;
    },
    boardStyle(state) {
      if (!state.board) return;
      return state.board.style;
    }
  },
  mutations: {
    setBoard(state, { board }) {
      state.board = board;
    },
    setTask(state, {payload}) {
      console.log('updatedTask',payload.task);
      state.task = payload.task;
    },
    // The version before that worked:
    // setTask(state, { task }) {
    //   state.task = task;
    // }

    // setTaskById(state, { taskId }) {
    //   state.board.groups.forEach(group => {
    //     group.tasks.forEach(task => {
    //       if (task.id === taskId) {
    //         state.task = task;
    //       }
    //     });
    //   });
    // }
  },
  actions: {
    async loadBoard({ commit }, { boardId }) {
      try {
        const board = await boardService.getById(boardId);
        commit({ type: 'setBoard', board });
        socketService.emit('board-watch', boardId);
        socketService.off('board-updated');
        socketService.on('board-updated', board => {
          commit({ type: 'setBoard', board });
        });
      } catch (err) {
        console.log('boardStore: Error in loadBoard', err);
        throw err;
      }
    },

    async setTaskById({ commit, state }, { taskId }) {
      console.log('taskId from store:',taskId);
      state.board.groups.forEach(group => {
        group.tasks.forEach(task => {
          if (task.id === taskId) {
            commit({ type: 'setTask', payload: {task} });
            socketService.emit('task-watch', taskId);
            socketService.off('task-updated');
            socketService.on('task-updated', task => {
              commit({ type: 'setTask', payload: {task} });
            });
          }
        });
      });
    },
    // The version that worked:
    // async setTaskById({ commit, state }, { taskId }) {
    //   console.log('taskId from store:',taskId);
    //   state.board.groups.forEach(group => {
    //     group.tasks.forEach(task => {
    //       if (task.id === taskId) {
    //         commit({ type: 'setTask', task });
    //         socketService.emit('task-watch', taskId);
    //         socketService.off('task-updated');
    //         socketService.on('task-updated', task => {
    //           commit({ type: 'setTask', task });
    //         });
    //       }
    //     });
    //   });
    // },
    async updateBoard({ commit }, { board }) {
      try {
        commit({ type: 'setBoard', board });
        const updatedBoard = await boardService.save(board);
      } catch (err) {
        console.log('cant update board', err);
      }
    },
    async updateTask({ commit, dispatch, state }, {payload}) {
      try {
        console.log('updatedTask', payload.task);
        console.log('activity', payload.activity);
        commit({ type: 'setTask', payload});
        const boardCopy = clone(state.board);
        payload.activity.byMember = (state.loggedinUser) ? state.loggedinUser : 'Guest';
        boardCopy.activities.push(payload.activity);
        console.log('boardCopy',boardCopy);
        const groupIdx = boardCopy.groups.findIndex(group =>
          group.tasks.some(({ id }) => id === payload.task.id)
        );
        const taskIdx = boardCopy.groups[groupIdx].tasks.findIndex(
          ({ id }) => id === payload.task.id
        );
        boardCopy.groups[groupIdx].tasks.splice(taskIdx, 1, payload.task);
        socketService.emit('task-updated', payload.task);
        dispatch({ type: 'updateBoard', board: boardCopy });
      } catch (err) {
        console.log('cannot update task', err);
      }
    },
    // The version before that worked:
    // async updateTask({ commit, dispatch, state }, {task}) {
    //   try {
    //     commit({ type: 'setTask', task});
    //     const boardCopy = clone(state.board);
    //     const groupIdx = boardCopy.groups.findIndex(group =>
    //       group.tasks.some(({ id }) => id === task.id)
    //     );
    //     const taskIdx = boardCopy.groups[groupIdx].tasks.findIndex(
    //       ({ id }) => id === task.id
    //     );
    //     boardCopy.groups[groupIdx].tasks.splice(taskIdx, 1, task);
    //     socketService.emit('task-updated', task);
    //     dispatch({ type: 'updateBoard', board: boardCopy });
    //   } catch (err) {
    //     console.log('cannot update task', err);
    //   }
    // }
  }
};
