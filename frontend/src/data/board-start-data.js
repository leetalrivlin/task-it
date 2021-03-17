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
};
