import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // 수정된 import 구문
import { QueryClient,QueryClientProvider } from 'react-query';
import './styles/index.css';
import App from './App';
import Tool from './Tool';
import Search from './Search';

const root = ReactDOM.createRoot(document.getElementById('root'));

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/tools" element={<Tool />} />
            <Route path="/search" element={<Search />} />
          </Routes>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
);
