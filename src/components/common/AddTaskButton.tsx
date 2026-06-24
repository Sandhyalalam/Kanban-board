import React from 'react';
import { useTaskStore } from '../../store/taskStoreContext';

export const AddTaskButton: React.FC = () => {
  const { dispatch } = useTaskStore();

  const handleClick = () => {
    dispatch({ type: 'OPEN_CREATE_MODAL' });
  };

  return (
    <button
      type="button"
      className="btn-primary"
      data-testid="add-task-btn"
      onClick={handleClick}
    >
      + Add Task
    </button>
  );
};