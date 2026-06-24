import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TaskStoreProvider } from './store/taskStoreContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TaskStoreProvider>
      <App />
    </TaskStoreProvider>
  </React.StrictMode>
);