import React from 'react';
import './styles/global.css';
import { useTaskStore } from './store/taskStoreContext';
import { FilterBar } from './components/common/FilterBar';
import { ViewToggle } from './components/common/ViewToggle';
import { AddTaskButton } from './components/common/AddTaskButton';
import { Board } from './components/kanban/Board';
import { TaskTable } from './components/table/TaskTable';
import { TaskModal } from './components/forms/TaskModal';

export const App: React.FC = () => {
  const { state } = useTaskStore();

  // For now, assignee options are derived from current tasks; later we can hardcode seeds.
  const assigneeOptions = Array.from(
    new Set(state.tasks.map((t) => t.assignee).filter(Boolean))
  );

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Kanban Task Manager</h1>
      </header>

      <main className="app-main">
        <div className="toolbar">
          <FilterBar assigneeOptions={assigneeOptions} />
          <div className="toolbar-right">
            <ViewToggle />
            <AddTaskButton />
          </div>
        </div>

        {state.view === 'kanban' ? <Board /> : <TaskTable />}
        <TaskModal />
      </main>
    </div>
  );
};

export default App;