const boards=[board1, board2]
const board1 = {
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
};
const board2 = {
  _id: 'b102',
  title: 'Web Development',
  createdAt: 1589563468418,
  createdBy: {
    _id: 'u101',
    fullname: 'Chen Sella',
    imgUrl: 'http://some-img',
  },
  style: {
    backgroundColor: '#91a8c4e3',
  },
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
      fullname: 'Chen Sella',
      imgUrl: 'https://www.google.com',
    },
    {
      _id: 'u102',
      fullname: 'Liz Amir',
      imgUrl: 'https://www.google.com',
    },
  ],
  groups: [
    {
      id: 'g103',
      title: 'Backlog',
      tasks: [
        {
          id: 'c105',
          title: 'Replace logo',
        },
        {
          id: 'c106',
          title: 'Add Samples',
        },
        {
          id: 'c107',
          title: 'Finish marketing new platform',
          cover:{
            backgroundColor :'#EF7564'
          }
        },
      ],
      style: {},
    },
    {
      id: 'g104',
      title: 'New Features',
      tasks: [
        {
          id: 'c108',
          title: 'Implement search bar',
          cover:{
            img:'https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80'
          }
        },
        {
          id: 'c109',
          title: ' Chrome Extensions for CSM tools',
        },
      ],
      style: {},
    },
    {
      id: 'g105',
      title: 'Running Tasks',
      tasks: [
        {
          id: 'c110',
          title: 'Ikea Build',
        },
        {
          id: 'c111',
          title: 'Happy Hour!',
        },
      ],
      style: {},
    },
    {
      id: 'g106',
      title: 'Fix & Upgrades',
      tasks: [
        {
          id: 'c112',
          title: 'Main Dashboard UI Edits',
        },
        {
          id: 'c113',
          title: 'Toolbar bug- when opening a task',
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
};
