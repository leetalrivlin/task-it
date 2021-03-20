import { storageService } from './async-storage.service';
import { httpService } from './http.service';
import { utilService } from './util.service';

const BOARD_URL = 'boardDb';
const gBoards = [
  {
    _id: 'b101',
    title: 'Robot dev proj',
    createdAt: 1589983468418,
    createdBy: {
      _id: 'u101',
      fullname: 'Abi Abambi',
      imgUrl: 'http://some-img'
    },
    style: {},
    labels: [
      {
        id: 'l101',
        title: 'Favourite',
        color: '#61bd4f'
      }
    ],
    members: [
      {
        _id: 'u101',
        fullname: 'Tal Tarablus',
        imgUrl: 'https://www.google.com'
      }
    ],
    groups: [
      {
        id: 'g101',
        title: 'Group 1',
        tasks: [
          {
            id: 'c101',
            title: 'Replace logo'
          },
          {
            id: 'c102',
            title: 'Add Samples'
          }
        ],
        style: {}
      },
      {
        id: 'g102',
        title: 'Group 2',
        tasks: [
          {
            id: 'c103',
            title: 'Do that'
          },
          {
            id: 'c104',
            title: 'Do it'
          }
        ],
        style: {}
      }
    ],
    activities: [
      {
        id: 'a101',
        txt: 'Changed Color',
        createdAt: 154514,
        byMember: {
          _id: 'u101',
          fullname: 'Abi Abambi',
          imgUrl: 'http://some-img'
        },
        task: {
          id: 'c101',
          title: 'Replace Logo'
        }
      }
    ]
  },
  {
    _id: 'b102',
    title: 'Web Development',
    createdAt: 1589563468418,
    createdBy: {
      _id: 'u101',
      fullname: 'Chen Sella',
      imgUrl: 'http://some-img'
    },
    style: {
      backgroundColor: '#91a8c4e3'
    },
    labels: [
      {
        id: 'l101',
        title: 'Favourite',
        color: '#61bd4f'
      }
    ],
    members: [
      {
        _id: 'u101',
        fullname: 'Chen Sella',
        imgUrl: 'https://www.google.com'
      },
      {
        _id: 'u102',
        fullname: 'Liz Amir',
        imgUrl: 'https://www.google.com'
      }
    ],
    groups: [
      {
        id: 'g103',
        title: 'Backlog',
        tasks: [
          {
            id: 'c105',
            title: 'Replace logo'
          },
          {
            id: 'c106',
            title: 'Add Samples'
          },
          {
            id: 'c107',
            title: 'Finish marketing new platform',
            cover: {
              backgroundColor: '#EF7564'
            }
          }
        ],
        style: {}
      },
      {
        id: 'g104',
        title: 'New Features',
        tasks: [
          {
            id: 'c108',
            title: 'Implement search bar',
            cover: {
              img:
                'https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80'
            }
          },
          {
            id: 'c109',
            title: ' Chrome Extensions for CSM tools'
          }
        ],
        style: {}
      },
      {
        id: 'g105',
        title: 'Running Tasks',
        tasks: [
          {
            id: 'c110',
            title: 'Ikea Build'
          },
          {
            id: 'c111',
            title: 'Happy Hour!'
          }
        ],
        style: {}
      },
      {
        id: 'g106',
        title: 'Fix & Upgrades',
        tasks: [
          {
            id: 'c112',
            title: 'Main Dashboard UI Edits'
          },
          {
            id: 'c113',
            title: 'Toolbar bug- when opening a task'
          }
        ],
        style: {}
      }
    ],
    activities: [
      {
        id: 'a101',
        txt: 'Changed Color',
        createdAt: 154514,
        byMember: {
          _id: 'u101',
          fullname: 'Abi Abambi',
          imgUrl: 'http://some-img'
        },
        task: {
          id: 'c101',
          title: 'Replace Logo'
        }
      }
    ]
  }
];

export const boardService = {
  getBoards,
  getById,
  getEmptyGroup,
  getEmptyTask,
  updateBoard,
  getEmptyChecklist,
  // getTaskById,
  // getGroupById
};

async function getBoards() {
  var boards;
  try {
    boards = await storageService.query(BOARD_URL);
    console.log(boards);
    if (!boards.length || !boards) {
      boards = gBoards;
      localStorage.setItem(BOARD_URL, JSON.stringify(boards));
    }
    return boards;
    // return httpService.get(`user`)
  } catch (err) {
    console.log('cant load boards', err);
  }
}

async function updateBoard(board) {
  try {
    const updatedBoard = await storageService.put(BOARD_URL, board);
    return updateBoard;
  } catch (err) {
    console.log('cant update board', err);
  }
}

async function getById(boardId) {
  try {
    const board = await storageService.get(BOARD_URL, boardId);
    return board;
  } catch (err) {
    console.log(`cnat load board ${boardId}`, err);
  }
  // return httpService.get(`user/${userId}`)
}

function remove(userId) {
  return storageService.remove('user', userId);
  // return httpService.delete(`user/${userId}`)
}

async function update(user) {
  return storageService.put('user', user);
  // user = await httpService.put(`user/${user._id}`, user)
  // Handle case in which admin updates other user's details
}

// async function getGroupById(boardId, groupId) {
//   try {
//     const board = await getById(boardId);
//     const group = board.find(group => {
//       return group.id === groupId;
//     })
//     return group;
//   } catch(err) {
//     console.log('cannot get group',err);
//   }
// }

// async function getTaskById(boardId, groupId, taskId) {
//   try {
//     const board = await getById(boardId);
//     const group = await getGroupById(boardId, groupId);
//     const task = board.group.find((task) => {
//       return task.id === taskId;
//     });
//     return task;
//   } catch (err) {
//     console.log('cannot get task', err);
//   }
// }

function getEmptyGroup() {
  return {
    id: utilService.makeId(3),
    title: '',
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
