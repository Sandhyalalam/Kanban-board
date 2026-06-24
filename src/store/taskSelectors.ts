import type {
  Task,
  TaskFilters,
  TaskState,
  TaskSort,
  TaskColumn,
} from './taskTypes';
export const getFilteredTasks = (tasks: Task[], filters: TaskFilters): Task[] => {
  const query = filters.searchQuery.trim().toLowerCase();

  return tasks.filter((task) => {
    const matchesSearch = query
      ? task.title.toLowerCase().includes(query)
      : true;

    const matchesPriority = filters.priority
      ? task.priority === filters.priority
      : true;

    const matchesAssignee = filters.assignee
      ? task.assignee === filters.assignee
      : true;

    return matchesSearch && matchesPriority && matchesAssignee;
  });
};

export const getTasksForColumn = (
  tasks: Task[],
  column: TaskColumn
): Task[] => {
  return tasks.filter((task) => task.column === column);
};

const priorityRank: Record<string, number> = {
  Low: 1,
  Medium: 2,
  High: 3,
};

export const getSortedTasks = (tasks: Task[], sort: TaskSort): Task[] => {
  if (!sort.field) return tasks;

  const sorted = [...tasks];

  sorted.sort((a, b) => {
    let comparison = 0;

    if (sort.field === 'priority') {
      comparison = priorityRank[a.priority] - priorityRank[b.priority];
    } else if (sort.field === 'dueDate') {
      // string compare works with YYYY-MM-DD
      if (a.dueDate < b.dueDate) comparison = -1;
      else if (a.dueDate > b.dueDate) comparison = 1;
      else comparison = 0;
    }

    return sort.direction === 'asc' ? comparison : -comparison;
  });

  return sorted;
};

export const selectDerivedFilteredTasks = (state: TaskState): Task[] => {
  return getFilteredTasks(state.tasks, state.filters);
};

export const selectDerivedTableTasks = (state: TaskState): Task[] => {
  const filtered = selectDerivedFilteredTasks(state);
  return getSortedTasks(filtered, state.sort);
};