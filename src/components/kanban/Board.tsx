import React from 'react';
import { useTaskStore } from '../../store/taskStoreContext';
import {
  selectDerivedFilteredTasks,
  getTasksForColumn,
} from '../../store/taskSelectors';
import { TaskCard } from './TaskCard';
import type { TaskColumn } from '../../store/taskTypes';

export const Board: React.FC = () => {
  const { state, dispatch } = useTaskStore();
  const filtered = selectDerivedFilteredTasks(state);

  const todoTasks = getTasksForColumn(filtered, 'todo');
  const inProgressTasks = getTasksForColumn(filtered, 'in-progress');
  const doneTasks = getTasksForColumn(filtered, 'done');

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // allow drop
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.add('board-column-drop-active');
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('board-column-drop-active');
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetColumn: TaskColumn
  ) => {
    e.preventDefault();
    e.currentTarget.classList.remove('board-column-drop-active');

    const taskId = e.dataTransfer.getData('text/plain');
    if (!taskId) return;

    const task = state.tasks.find((t) => t.id === taskId);
    if (!task || task.column === targetColumn) return;

    dispatch({ type: 'MOVE_TASK', payload: { id: taskId, column: targetColumn } });
  };

  const handleDropCleanup = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('board-column-drop-active');
  };

  return (
    <section className="board">
      <div
        className="board-column"
        data-testid="column-todo"
      >
        <header className="board-column-header">
          <h2>To Do</h2>
          <span className="badge">{todoTasks.length}</span>
        </header>
        <div
          className="board-column-body"
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, 'todo')}
          onDragEnd={handleDropCleanup}
        >
          {todoTasks.length === 0 ? (
            <p className="empty-text">No tasks yet.</p>
          ) : (
            todoTasks.map((task) => <TaskCard key={task.id} task={task} />)
          )}
        </div>
      </div>

      <div
        className="board-column"
        data-testid="column-in-progress"
      >
        <header className="board-column-header">
          <h2>In Progress</h2>
          <span className="badge">{inProgressTasks.length}</span>
        </header>
        <div
          className="board-column-body"
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, 'in-progress')}
          onDragEnd={handleDropCleanup}
        >
          {inProgressTasks.length === 0 ? (
            <p className="empty-text">No tasks yet.</p>
          ) : (
            inProgressTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))
          )}
        </div>
      </div>

      <div
        className="board-column"
        data-testid="column-done"
      >
        <header className="board-column-header">
          <h2>Done</h2>
          <span className="badge">{doneTasks.length}</span>
        </header>
        <div
          className="board-column-body"
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, 'done')}
          onDragEnd={handleDropCleanup}
        >
          {doneTasks.length === 0 ? (
            <p className="empty-text">No tasks yet.</p>
          ) : (
            doneTasks.map((task) => <TaskCard key={task.id} task={task} />)
          )}
        </div>
      </div>
    </section>
  );
};