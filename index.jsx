import React from 'react';
import ReactDOM from 'react-dom/client';
import { ContextProvider } from './contextProvider/Context'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <App />
  </ContextProvider>
); 