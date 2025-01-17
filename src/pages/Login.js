// src/pages/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedData = localStorage.getItem('registeredUser');
    if (!storedData) {
      alert('등록된 회원정보가 없습니다. 회원가입을 진행해주세요.');
      return;
    }
    const { email: savedEmail, password: savedPassword } = JSON.parse(storedData);
    if (email === savedEmail && password === savedPassword) {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/dashboard');
    } else {
      alert('이메일 또는 비밀번호가 잘못되었습니다.');
    }
  };

  return (
    <div className="container">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="button">
          로그인
        </button>
      </form>
      <p>
        아직 회원이 아니신가요? <Link to="/register">회원가입</Link>
      </p>
    </div>
  );
}

export default Login;