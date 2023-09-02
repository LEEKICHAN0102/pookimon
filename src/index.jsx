import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // 수정된 import 구문
import './styles/index.css';
import App from './App';
import Tool from './Tool';
import Search from './Search';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/tools" element={<Tool />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </React.StrictMode>
  </Router>
);
