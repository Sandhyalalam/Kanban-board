import React from 'react';
import './styles/global.css';

export const App: React.FC = () => {
  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Kanban Task Manager</h1>
      </header>
      <main className="app-main">
        {/* We will mount filter bar + view toggle + board/table here */}
        <p>Kanban Task Manager is loading...</p>
      </main>
    </div>
  );
};

export default App;