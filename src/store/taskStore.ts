import type {
  Task,
  TaskState,
  TaskFilters,
  TaskSort,
  ViewMode,
} from './taskTypes';
import { storage } from '../utils/storage';

const STORAGE_KEY = 'kanban_dashboard_tasks';

export type TaskAction =
  | { type: 'HYDRATE_TASKS'; payload: Task[] }
  | { type: 'SET_FILTERS'; payload: Partial<TaskFilters> }
  | { type: 'CLEAR_FILTERS' }
  | { type: 'SET_VIEW'; payload: ViewMode }
  | { type: 'SET_SORT'; payload: TaskSort }
  | { type: 'OPEN_CREATE_MODAL' }
  | { type: 'OPEN_EDIT_MODAL'; payload: { taskId: string } }
  | { type: 'CLOSE_MODAL' }
  | { type: 'CREATE_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: { id: string } }
  | { type: 'MOVE_TASK'; payload: { id: string; column: Task['column'] } };

export const initialState: TaskState = {
  tasks: [],
  filters: {
    searchQuery: '',
    priority: null,
    assignee: null,
  },
  view: 'kanban',
  sort: {
    field: null,
    direction: 'asc',
  },
  ui: {
    isModalOpen: false,
    editingTaskId: null,
  },
};

export function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case 'HYDRATE_TASKS': {
      return {
        ...state,
        tasks: action.payload,
      };
    }

    case 'SET_FILTERS': {
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };
    }

    case 'CLEAR_FILTERS': {
      return {
        ...state,
        filters: {
          searchQuery: '',
          priority: null,
          assignee: null,
        },
      };
    }

    case 'SET_VIEW': {
      return {
        ...state,
        view: action.payload,
      };
    }

    case 'SET_SORT': {
      return {
        ...state,
        sort: action.payload,
      };
    }

    case 'OPEN_CREATE_MODAL': {
      return {
        ...state,
        ui: {
          isModalOpen: true,
          editingTaskId: null,
        },
      };
    }

    case 'OPEN_EDIT_MODAL': {
      return {
        ...state,
        ui: {
          isModalOpen: true,
          editingTaskId: action.payload.taskId,
        },
      };
    }

    case 'CLOSE_MODAL': {
      return {
        ...state,
        ui: {
          isModalOpen: false,
          editingTaskId: null,
        },
      };
    }

    case 'CREATE_TASK': {
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    }

    case 'UPDATE_TASK': {
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    }

    case 'DELETE_TASK': {
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload.id),
      };
    }

    case 'MOVE_TASK': {
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? { ...t, column: action.payload.column } : t
        ),
      };
    }

    default:
      return state;
  }
}

// Helpers for Local Storage lifecycle

export const STORAGE_KEY_TASKS = STORAGE_KEY;

export const loadInitialTasks = (): Task[] => {
  const storedTasks = storage.load<Task[]>(STORAGE_KEY_TASKS, []);
  if (Array.isArray(storedTasks)) return storedTasks;
  return [];
};

export const persistTasks = (tasks: Task[]): void => {
  storage.save(STORAGE_KEY_TASKS, tasks);
};