import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import App from './App.tsx';
import './index.css';
import Page from './views/Page/Page.tsx';
import LoginPage from './views/Login.tsx';
import SignupPage from './views/Signup.tsx';
import NotFoundPage from './views/NotFoundPage.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/page/dashboard" element={<Page />} />
        <Route path="/page/transformer" element={<Page />} /> 
        <Route path="/page/analytics" element={<Page />} /> 
         {/* 通配符路由，匹配所有未定义的路径 */}
         <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
