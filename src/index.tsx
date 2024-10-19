import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './ErrorBoundary';

declare global {
  interface Window {
    __REACT_DEVTOOLS_GLOBAL_HOOK__?: any;
  }
}

if (process.env.NODE_ENV === 'production') {
  if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object') {
    for (let [key, value] of Object.entries(window.__REACT_DEVTOOLS_GLOBAL_HOOK__ || {})) {
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] = typeof value == 'function' ? () => {} : null;
    }
  }
}

if (process.env.NODE_ENV === 'production') {
  console.error = () => {};
  console.warn = () => {};
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ErrorBoundary onRetry={() => window.location.reload()}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
