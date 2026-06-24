import React, { useEffect, useMemo, useState } from 'react';
import { useTaskStore } from '../../store/taskStoreContext';
import type { Task, TaskPriority } from '../../store/taskTypes';
import { useFocusTrap } from '../../utils/useFocusTrap';

const createEmptyTaskDraft = (): Omit<Task, 'id' | 'createdAt' | 'column'> => ({
  title: '',
  description: '',
  priority: 'Medium',
  assignee: '',
  dueDate: '',
});

const generateId = () => crypto.randomUUID?.() ?? String(Date.now());

export const TaskModal: React.FC = () => {
  const { state, dispatch } = useTaskStore();
  const { isModalOpen, editingTaskId } = state.ui;

  const existingTask = useMemo(
    () => state.tasks.find((t) => t.id === editingTaskId) ?? null,
    [editingTaskId, state.tasks]
  );

  const isEditMode = Boolean(editingTaskId && existingTask);

  const [draft, setDraft] = useState(
    isEditMode && existingTask
      ? {
          title: existingTask.title,
          description: existingTask.description,
          priority: existingTask.priority,
          assignee: existingTask.assignee,
          dueDate: existingTask.dueDate,
        }
      : createEmptyTaskDraft()
  );
  const [error, setError] = useState<string | null>(null);

  // Reset draft when modal mode changes
  useEffect(() => {
    if (isEditMode && existingTask) {
      setDraft({
        title: existingTask.title,
        description: existingTask.description,
        priority: existingTask.priority,
        assignee: existingTask.assignee,
        dueDate: existingTask.dueDate,
      });
    } else {
      setDraft(createEmptyTaskDraft());
    }
    setError(null);
  }, [isEditMode, existingTask]);

  const containerRef = useFocusTrap<HTMLDivElement>();

  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      closeModal();
    }
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDraft((prev) => ({
      ...prev,
      [name]:
        name === 'priority' ? (value as TaskPriority) : value,
    }));
  };

  const handleDelete = () => {
    if (!isEditMode || !existingTask) return;
    dispatch({ type: 'DELETE_TASK', payload: { id: existingTask.id } });
    closeModal();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!draft.title.trim()) {
      setError('Title is required.');
      return;
    }

    if (isEditMode && existingTask) {
      const updated: Task = {
        ...existingTask,
        title: draft.title.trim(),
        description: draft.description.trim(),
        priority: draft.priority,
        assignee: draft.assignee.trim(),
        dueDate: draft.dueDate,
      };
      dispatch({ type: 'UPDATE_TASK', payload: updated });
    } else {
      const now = new Date().toISOString();
      const newTask: Task = {
        id: generateId(),
        title: draft.title.trim(),
        description: draft.description.trim(),
        priority: draft.priority,
        assignee: draft.assignee.trim(),
        dueDate: draft.dueDate,
        column: 'todo',
        createdAt: now,
      };
      dispatch({ type: 'CREATE_TASK', payload: newTask });
    }

    closeModal();
  };

  if (!isModalOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
    >
      <div
        className="modal"
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-modal-title"
      >
        <header className="modal-header">
          <h2 id="task-modal-title">
            {isEditMode ? 'Edit Task' : 'Create Task'}
          </h2>
        </header>

        <form className="modal-body" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="title">
              Title<span className="required">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={draft.title}
              onChange={handleChange}
              aria-invalid={Boolean(error)}
            />
            {error && <p className="error-text">{error}</p>}
          </div>

          <div className="form-row">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={draft.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="form-grid">
            <div className="form-row">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                name="priority"
                value={draft.priority}
                onChange={handleChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="form-row">
              <label htmlFor="assignee">Assignee</label>
              <input
                id="assignee"
                name="assignee"
                type="text"
                value={draft.assignee}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <label htmlFor="dueDate">Due Date</label>
              <input
                id="dueDate"
                name="dueDate"
                type="date"
                value={draft.dueDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <footer className="modal-footer">
            {isEditMode && (
              <button
                type="button"
                className="btn-danger"
                onClick={handleDelete}
              >
                Delete
              </button>
            )}
            <div className="modal-footer-right">
              <button
                type="button"
                className="btn-secondary"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                {isEditMode ? 'Save changes' : 'Create task'}
              </button>
            </div>
          </footer>
        </form>
      </div>
    </div>
  );
};