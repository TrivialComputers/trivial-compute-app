import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import QuestionEditor from './components/QuestionEditor/QuestionEditor';
import JoinGame from './components/SignIn/JoinGame';
import Register from './components/SignIn/NewGame';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/editor" element={<QuestionEditor />} />
      <Route path="/joinGame" element={<JoinGame/>} />
    </Routes>
  </BrowserRouter>
);
