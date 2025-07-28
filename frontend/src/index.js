import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import QuestionEditor from './components/QuestionEditor/QuestionEditor';
import SignIn from './components/SignIn/SignIn';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/editor" element={<QuestionEditor />} />
      <Route path="/game/:id" element={<App />} />
    </Routes>
  </BrowserRouter>
);
