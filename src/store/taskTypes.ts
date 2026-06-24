export type TaskColumn = 'todo' | 'in-progress' | 'done';

export type TaskPriority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  assignee: string;
  dueDate: string; // ISO 8601 (YYYY-MM-DD)
  column: TaskColumn;
  createdAt: string;
}

export interface TaskFilters {
  searchQuery: string;
  priority: TaskPriority | null;
  assignee: string | null;
}

export type ViewMode = 'kanban' | 'table';

export type SortField = 'priority' | 'dueDate' | null;
export type SortDirection = 'asc' | 'desc';

export interface TaskSort {
  field: SortField;
  direction: SortDirection;
}

export interface TaskUIState {
  isModalOpen: boolean;
  editingTaskId: string | null;
}

export interface TaskState {
  tasks: Task[];
  filters: TaskFilters;
  view: ViewMode;
  sort: TaskSort;
  ui: TaskUIState;
}