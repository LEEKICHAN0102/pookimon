import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // React Router의 BrowserRouter 임포트
import './styles/index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router> {/* Router로 앱을 감싸주기 */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>,
);
