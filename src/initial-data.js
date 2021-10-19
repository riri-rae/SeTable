const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Apple' },
    'task-2': { id: 'task-2', content: 'Banana' },
    'task-3': { id: 'task-3', content: 'Cinnamon' },
    'task-4': { id: 'task-4', content: 'Donuts' },
    'task-5': { id: 'task-5', content: 'Eggplan' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Table-1',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4', 'task-5'],
    },
    'column-2': {
      id: 'column-2',
      title: 'Table-2',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Table-3',
      taskIds: [],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

export default initialData;

