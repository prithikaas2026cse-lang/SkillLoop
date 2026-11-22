import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SkillLoopProvider } from './context/SkillLoopContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SkillLoopProvider>
      <App />
    </SkillLoopProvider>
  </React.StrictMode>
);
