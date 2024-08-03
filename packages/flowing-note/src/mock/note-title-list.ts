export default {
  title: '我的知识库',
  treeData: [
    {
      id: 1,
      title: 'Title 1'
    },
    {
      id: 2,
      title:
        'Title 2 with a very long description that needs to be truncated to fit within the UI',
      children: [
        {
          id: 21,
          title: 'Child Title 1',
          children: [
            {
              id: 211,
              title: 'Grandchild Title 1'
            }
          ]
        },
        {
          id: 22,
          title: 'Child Title 2'
        }
      ]
    },
    {
      id: 3,
      title: 'Title 3'
    },
    {
      id: 4,
      title: 'Title 4 with special characters: !@#$%^&*()',
      children: [
        {
          id: 41,
          title: 'Child Title 3'
        }
      ]
    },
    {
      id: 5,
      title: 'Title 5 with numbers 1234567890'
    },
    {
      id: 6,
      title: 'Title 6 with spaces and special characters: !@#$%^&*()',
      children: [
        {
          id: 61,
          title: 'Child Title 4'
        },
        {
          id: 62,
          title: 'Child Title 5'
        }
      ]
    },
    {
      id: 7,
      title: 'Title 7 with numbers 1234567890 and spaces'
    },
    {
      id: 8,
      title:
        'Title 8 with special characters: !@#$%^&*() and numbers 1234567890',
      children: [
        {
          id: 81,
          title: 'Child Title 6'
        }
      ]
    },
    {
      id: 9,
      title: 'Title 9 with spaces and numbers 1234567890'
    },
    {
      id: 10,
      title:
        'Title 10 with a very long description that needs to be truncated to fit within the UI and special characters: !@#$%^&*()',
      children: [
        {
          id: 101,
          title: 'Child Title 7'
        },
        {
          id: 102,
          title: 'Child Title 8'
        },
        {
          id: 103,
          title: 'Child Title 9'
        }
      ]
    }
  ]
}
