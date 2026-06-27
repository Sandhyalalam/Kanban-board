import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TaskStoreProvider } from './store/taskStoreContext';
import { ToastProvider } from './components/common/ToastProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TaskStoreProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </TaskStoreProvider>
  </React.StrictMode>
);