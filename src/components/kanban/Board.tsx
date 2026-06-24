import React from 'react';
import { useTaskStore } from '../../store/taskStoreContext';
import {
  selectDerivedFilteredTasks,
  getTasksForColumn,
} from '../../store/taskSelectors';
import { TaskCard } from './TaskCard';

export const Board: React.FC = () => {
  const { state } = useTaskStore();
  const filtered = selectDerivedFilteredTasks(state);

  const todoTasks = getTasksForColumn(filtered, 'todo');
  const inProgressTasks = getTasksForColumn(filtered, 'in-progress');
  const doneTasks = getTasksForColumn(filtered, 'done');

  return (
    <section className="board">
      <div className="board-column" data-testid="column-todo">
        <header className="board-column-header">
          <h2>To Do</h2>
          <span className="badge">{todoTasks.length}</span>
        </header>
        <div className="board-column-body">
          {todoTasks.length === 0 ? (
            <p className="empty-text">No tasks yet.</p>
          ) : (
            todoTasks.map((task) => <TaskCard key={task.id} task={task} />)
          )}
        </div>
      </div>

      <div className="board-column" data-testid="column-in-progress">
        <header className="board-column-header">
          <h2>In Progress</h2>
          <span className="badge">{inProgressTasks.length}</span>
        </header>
        <div className="board-column-body">
          {inProgressTasks.length === 0 ? (
            <p className="empty-text">No tasks yet.</p>
          ) : (
            inProgressTasks.map((task) => <TaskCard key={task.id} task={task} />)
          )}
        </div>
      </div>

      <div className="board-column" data-testid="column-done">
        <header className="board-column-header">
          <h2>Done</h2>
          <span className="badge">{doneTasks.length}</span>
        </header>
        <div className="board-column-body">
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