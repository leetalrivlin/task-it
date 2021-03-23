import { storageService } from './async-storage.service';
import { httpService } from './http.service';
import { utilService } from './util.service';

// const BOARD_URL = 'boardDb';
const BOARD_URL = 'board/';
const USERS_URL = 'usersDb';
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
        username: 'Tal',
        fullname: 'Tal Tarablus',
        imgUrl: 'https://www.google.com'
      },
      {
        _id: 'u102',
        username: 'Dan',
        fullname: 'Dan Cohen',
        imgUrl: 'https://www.google.com'
      },
      {
        _id: 'u103',
        username: 'Shani',
        fullname: 'Shani Ofer',
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
      imgUrl:
        'https://ca.slack-edge.com/T01FLU17LTC-U01FMA939AP-f330f75ce89a-512'
    },
    style: {
      background: '#91a8c4e3'
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
        title: '',
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
    members: [
      {
        _id: 'u110',
        username: 'leetal',
        fullname: 'Leetal Rivlin-Tal',
        imgUrl:
          'https://ca.slack-edge.com/T01FLU17LTC-U01FM468LKC-60df056b28da-512'
      },
      {
        _id: 'u111',
        username: 'liz',
        fullname: 'Liz Amir',
        imgUrl:
          'https://ca.slack-edge.com/T01FLU17LTC-U01H921LE8N-e2e268e6b1b7-512'
      },
      {
        _id: 'u112',
        username: 'chen',
        fullname: 'Chen Sella',
        imgUrl:
          'https://ca.slack-edge.com/T01FLU17LTC-U01FMA939AP-f330f75ce89a-512'
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
              img: {
                url:
                  'https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
                name: 'search'
              }
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
const gUsers = [
  {
    _id: 'u1001',
    fullname: 'Puki Norma',
    username: 'user1',
    password: '123',
    isAdmin: false
  },
  {
    _id: 'u1002',
    fullname: 'loca noni',
    username: 'loca',
    password: '123',
    isAdmin: false
  },
  {
    _id: 'u1003',
    fullname: 'sasi romi',
    username: 'sasi',
    password: '123',
    isAdmin: false
  },
  {
    _id: 'u1004',
    fullname: 'kuku sanguko',
    username: 'kuku',
    password: '123',
    isAdmin: false
  },
  {
    _id: 'u112',
    fullname: 'Chen Sella',
    username: 'chen',
    password: '123',
    isAdmin: false,
    imgUrl: 'https://ca.slack-edge.com/T01FLU17LTC-U01FM468LKC-60df056b28da-512'
  },
  {
    _id: 'u110',
    fullname: 'Leetal Rivlin-Tal',
    username: 'leetal',
    password: '123',
    isAdmin: false,
    imgUrl: 'https://ca.slack-edge.com/T01FLU17LTC-U01FMA939AP-f330f75ce89a-512'
  },
  {
    _id: 'u111',
    fullname: 'Liz Amir',
    username: 'liz',
    password: '123',
    isAdmin: false,
    imgUrl: 'https://ca.slack-edge.com/T01FLU17LTC-U01H921LE8N-e2e268e6b1b7-512'
  }
];

export const boardService = {
  query,
  // getBoards,
  getById,
  save,
  getEmptyGroup,
  getEmptyTask,

  // updateBoard,
  getEmptyChecklist,
  getEmptyTodo,
  getEmptyAttachment,
  getUsers
};

async function query() {
  try {
    const boards = await httpService.get(BOARD_URL);
    return boards
  } catch (err) {
    console.log('cant load boards', err);
  }
}

async function getById(id) {
  try {
    // const board = await storageService.get(BOARD_URL, boardId);
    const board = await httpService.get(BOARD_URL + id);
    return board;
  } catch (err) {
    console.log(`cnat load board ${boardId}`, err);
  }
}

// async function getBoards() {
//   var boards;
//   try {
//     boards = await storageService.query(BOARD_URL);
//     if (!boards.length || !boards) {
//       boards = gBoards;
//       localStorage.setItem(BOARD_URL, JSON.stringify(boards));
//     }
//     return boards;
//     // return httpService.get(`user`)
//   } catch (err) {
//     console.log('cant load boards', err);
//   }
// }

async function save(board) {
  var newBoard;
  try {
    if (board._id) {
      newBoard = await httpService.put(BOARD_URL + board._id, board);
    } else {
      newBoard = await httpService.post(BOARD_URL, board);
    }
    // const updatedBoard = await storageService.put(BOARD_URL, board);
    return newBoard;
  } catch (err) {
    console.log('cant save board', err);
  }
}

async function getUsers() {
  var users;
  try {
    users = await storageService.query(USERS_URL);
    if (!users.length || !users) {
      users = gUsers;
      localStorage.setItem(USERS_URL, JSON.stringify(users));
    }
    return users;
    // return httpService.get(`user`)
  } catch (err) {
    console.log('cant load users', err);
  }
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
