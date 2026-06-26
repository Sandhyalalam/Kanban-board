import React from 'react';
import type { Task } from '../../store/taskTypes';
import { useTaskStore } from '../../store/taskStoreContext';

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { dispatch } = useTaskStore();

  const handleEditClick = () => {
    dispatch({ type: 'OPEN_EDIT_MODAL', payload: { taskId: task.id } });
  };

  const handleDragStart = (e: React.DragEvent<HTMLElement>) => {
    e.dataTransfer.setData('text/plain', task.id);
    e.dataTransfer.effectAllowed = 'move';
    e.currentTarget.classList.add('task-card-dragging');
  };

  const handleDragEnd = (e: React.DragEvent<HTMLElement>) => {
    e.currentTarget.classList.remove('task-card-dragging');
  };

  const priorityClass =
    task.priority === 'High'
      ? 'priority-high'
      : task.priority === 'Medium'
      ? 'priority-medium'
      : 'priority-low';

  const descriptionSnippet =
    task.description.length > 120
      ? task.description.slice(0, 117) + '...'
      : task.description;

  return (
    <article
      className="task-card"
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <header className="task-card-header">
        <h3>{task.title}</h3>
        <span className={`priority-badge ${priorityClass}`}>
          {task.priority}
        </span>
      </header>
      {task.description && (
        <p className="task-card-description">{descriptionSnippet}</p>
      )}
      <div className="task-card-meta">
        {task.assignee && (
          <span className="meta-pill">
            <span className="meta-label">Assignee</span>
            <span className="meta-value">{task.assignee}</span>
          </span>
        )}
        {task.dueDate && (
          <span className="meta-pill">
            <span className="meta-label">Due</span>
            <span className="meta-value">{task.dueDate}</span>
          </span>
        )}
      </div>
      <footer className="task-card-footer">
        <button
          type="button"
          className="btn-secondary btn-sm"
          data-testid={`edit-task-btn-${task.id}`}
          onClick={handleEditClick}
        >
          Edit
        </button>
      </footer>
    </article>
  );
};