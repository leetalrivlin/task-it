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
      imgUrl: 'http://some-img',
    },
    style: {},
    labels: [
      {
        id: 'l101',
        title: 'Favourite',
        color: '#61bd4f',
      },
    ],
    members: [
      {
        _id: 'u101',
        fullname: 'Tal Tarablus',
        imgUrl: 'https://www.google.com',
      },
    ],
    groups: [
      {
        id: 'g101',
        title: 'Group 1',
        tasks: [
          {
            id: 'c101',
            title: 'Replace logo',
          },
          {
            id: 'c102',
            title: 'Add Samples',
          },
        ],
        style: {},
      },
      {
        id: 'g102',
        title: 'Group 2',
        tasks: [
          {
            id: 'c103',
            title: 'Do that',
          },
          {
            id: 'c104',
            title: 'Do it',
          },
        ],
        style: {},
      },
    ],
    activities: [
      {
        id: 'a101',
        txt: 'Changed Color',
        createdAt: 154514,
        byMember: {
          _id: 'u101',
          fullname: 'Abi Abambi',
          imgUrl: 'http://some-img',
        },
        task: {
          id: 'c101',
          title: 'Replace Logo',
        },
      },
    ],
  },
  {
    _id: 'b1012',
    title: 'Trello Proj',
    createdAt: 1589563468418,
    createdBy: {
      _id: 'u101',
      fullname: 'Abi Abambi',
      imgUrl: 'http://some-img',
    },
    style: {},
    labels: [
      {
        id: 'l101',
        title: 'Favourite',
        color: '#61bd4f',
      },
    ],
    members: [
      {
        _id: 'u101',
        fullname: 'Tal Tarablus',
        imgUrl: 'https://www.google.com',
      },
    ],
    groups: [
      {
        id: 'g103',
        title: 'First Assignment',
        tasks: [
          {
            id: 'c105',
            title: 'Replace logo',
          },
          {
            id: 'c106',
            title: 'Add Samples',
          },
        ],
        style: {},
      },
      {
        id: 'g104',
        title: 'Second Assignment',
        tasks: [
          {
            id: 'c107',
            title: 'Do that',
          },
          {
            id: 'c108',
            title: 'Do it',
          },
        ],
        style: {},
      },
    ],
    activities: [
      {
        id: 'a101',
        txt: 'Changed Color',
        createdAt: 154514,
        byMember: {
          _id: 'u101',
          fullname: 'Abi Abambi',
          imgUrl: 'http://some-img',
        },
        task: {
          id: 'c101',
          title: 'Replace Logo',
        },
      },
    ],
  },
];

export const boardService = {
  getBoards,
  getById,
  getEmptyGroup,
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

function getEmptyGroup(){
  return {
    id: utilService.makeId(3),
    title: '',
    tasks: []
  }
}