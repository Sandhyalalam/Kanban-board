import React from 'react';
import { useTaskStore } from '../../store/taskStoreContext';
import type { TaskPriority } from '../../store/taskTypes';

interface FilterBarProps {
  assigneeOptions: string[];
}

export const FilterBar: React.FC<FilterBarProps> = ({ assigneeOptions }) => {
  const { state, dispatch } = useTaskStore();
  const { filters } = state;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: { searchQuery: e.target.value },
    });
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value || null;
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        priority: value ? (value as TaskPriority) : null,
      },
    });
  };

  const handleAssigneeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value || null;
    dispatch({
      type: 'SET_FILTERS',
      payload: { assignee: value },
    });
  };

  const handleClearFilters = () => {
    dispatch({ type: 'CLEAR_FILTERS' });
  };

  return (
    <section className="filter-bar">
      <div className="filter-bar-left">
        <input
          type="text"
          className="filter-input"
          placeholder="Search by title..."
          data-testid="search-input"
          value={filters.searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="filter-bar-right">
        <select
          className="filter-select"
          data-testid="priority-filter"
          value={filters.priority ?? ''}
          onChange={handlePriorityChange}
        >
          <option value="">All priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select
          className="filter-select"
          data-testid="assignee-filter"
          value={filters.assignee ?? ''}
          onChange={handleAssigneeChange}
        >
          <option value="">All assignees</option>
          {assigneeOptions.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="btn-secondary"
          onClick={handleClearFilters}
        >
          Clear filters
        </button>
      </div>
    </section>
  );
};