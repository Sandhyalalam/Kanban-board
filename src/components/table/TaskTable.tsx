import React from 'react';
import { useTaskStore } from '../../store/taskStoreContext';
import { selectDerivedTableTasks } from '../../store/taskSelectors';
import type { SortField, SortDirection } from '../../store/taskTypes';

const getNextDirection = (current: SortDirection): SortDirection =>
  current === 'asc' ? 'desc' : 'asc';

export const TaskTable: React.FC = () => {
  const { state, dispatch } = useTaskStore();
  const tasks = selectDerivedTableTasks(state);

  const handleSortClick = (field: SortField) => {
    if (state.sort.field !== field) {
      dispatch({
        type: 'SET_SORT',
        payload: { field, direction: 'asc' },
      });
    } else {
      dispatch({
        type: 'SET_SORT',
        payload: {
          field,
          direction: getNextDirection(state.sort.direction),
        },
      });
    }
  };

  const renderSortIndicator = (field: SortField) => {
    if (state.sort.field !== field) return null;
    return (
      <span className="sort-indicator">
        {state.sort.direction === 'asc' ? '▲' : '▼'}
      </span>
    );
  };

  return (
    <section className="table-wrapper">
      <table className="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th
              className="sortable"
              onClick={() => handleSortClick('priority')}
            >
              Priority {renderSortIndicator('priority')}
            </th>
            <th>Assignee</th>
            <th
              className="sortable"
              onClick={() => handleSortClick('dueDate')}
            >
              Due Date {renderSortIndicator('dueDate')}
            </th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan={6} className="empty-text">
                No tasks to display.
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td className="table-description">{task.description}</td>
                <td>{task.priority}</td>
                <td>{task.assignee}</td>
                <td>{task.dueDate}</td>
                <td>{task.column}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
};