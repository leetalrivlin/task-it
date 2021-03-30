import { httpService } from './http.service';
import { utilService } from './util.service';

const BOARD_URL = 'board/';

export const boardService = {
  query,
  getById,
  save,
  remove,
  getEmptyGroup,
  getEmptyTask,
  getEmptyActivity,
  getEmptyBoard,
  getEmptyChecklist,
  getEmptyTodo,
  getEmptyAttachment
};

async function query() {
  try {
    const boards = await httpService.get(BOARD_URL);
    return boards;
  } catch (err) {
    console.log('cant load boards', err);
  }
}

async function getById(id) {
  try {
    const board = await httpService.get(BOARD_URL + id);
    return board;
  } catch (err) {
    console.log(`cnat load board ${boardId}`, err);
  }
}

async function save(board) {
  var newBoard;
  try {
    if (board._id) {
      newBoard = await httpService.put(BOARD_URL + board._id, board);
    } else {
      newBoard = await httpService.post(BOARD_URL, board);
    }
    return newBoard;
  } catch (err) {
    console.log('cant save board', err);
  }
}

function remove(boardId) {
  console.log('deleting board', boardId);
  return httpService.delete(`board/${boardId}`, boardId);
}


function getEmptyGroup(title = '') {
  return {
    id: utilService.makeId(3),
    title,
    tasks: []
  };
}
function getEmptyTask() {
  return {
    id: utilService.makeId(3),
    title: ''
  };
}
function getEmptyChecklist() {
  return {
    id: utilService.makeId(3),
    title: '',
    todos: []
  };
}

function getEmptyTodo() {
  return {
    id: utilService.makeId(3),
    txt: '',
    isDone: false
  };
}

function getEmptyAttachment() {
  return {
    id: utilService.makeId(4),
    name: '',
    url: ''
  };
}

function getEmptyActivity(txt = '') {
  return {
    id: utilService.makeId(4),
    txt,
    createdAt: Date.now()
  };
}

function getEmptyBoard() {
  return {
    title: 'newBoard',
    createdAt: Date.now(),
    createdBy: '',
    style: {
      background: 'url(/img/bgc-4.0061c796.jpg)'
    },
    labels: [
      {
        id: 'l101',
        title: '',
        color: '#60BD4F'
      },
      {
        id: 'l102',
        title: '',
        color: '#F2D600'
      },
      {
        id: 'l103',
        title: 'orange',
        color: '#ff9f1a'
      },
      {
        id: 'l104',
        title: '',
        color: '#eb5a46'
      },
      {
        id: 'l105',
        title: '',
        color: '#c377e0'
      },
      {
        id: 'l106',
        title: '',
        color: '#0079bf'
      }
    ],
    groups: [getEmptyGroup('Backlog')],
    activities: [getEmptyActivity('Board created')]
  };
}
