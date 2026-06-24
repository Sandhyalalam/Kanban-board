import React from 'react';
import { useTaskStore } from '../../store/taskStoreContext';

export const ViewToggle: React.FC = () => {
  const { state, dispatch } = useTaskStore();

  const handleToggle = () => {
    dispatch({
      type: 'SET_VIEW',
      payload: state.view === 'kanban' ? 'table' : 'kanban',
    });
  };

  const label = state.view === 'kanban' ? 'Switch to Table view' : 'Switch to Board view';

  return (
    <button
      type="button"
      className="btn-primary"
      data-testid="view-toggle"
      onClick={handleToggle}
    >
      {label}
    </button>
  );
};