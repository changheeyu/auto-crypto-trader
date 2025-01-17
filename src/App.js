import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Routes>
      {/* 메인 페이지(예: /)에서 로그인 페이지를 보여주도록 설정 */}
      <Route path="/" element={<Login />} />
      {/* 회원가입 */}
      <Route path="/register" element={<Register />} />
      {/* 로그인 후 대시보드 */}
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;