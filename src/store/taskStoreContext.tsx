import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import type { ReactNode } from 'react';
import type { TaskState } from './taskTypes';
import {
  initialState,
  taskReducer,
  type TaskAction,
  loadInitialTasks,
  persistTasks,
} from './taskStore';

interface TaskStoreContextValue {
  state: TaskState;
  dispatch: React.Dispatch<TaskAction>;
}

const TaskStoreContext = createContext<TaskStoreContextValue | undefined>(
  undefined
);

export const TaskStoreProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Hydrate tasks from Local Storage on first mount
  useEffect(() => {
    const tasks = loadInitialTasks();
    if (tasks.length > 0) {
      dispatch({ type: 'HYDRATE_TASKS', payload: tasks });
    }
  }, []);

  // Persist tasks whenever they change
  useEffect(() => {
    persistTasks(state.tasks);
  }, [state.tasks]);

  return (
    <TaskStoreContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskStoreContext.Provider>
  );
};

export const useTaskStore = (): TaskStoreContextValue => {
  const ctx = useContext(TaskStoreContext);
  if (!ctx) {
    throw new Error('useTaskStore must be used within TaskStoreProvider');
  }
  return ctx;
};