// src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    localStorage.setItem('registeredUser', JSON.stringify(userData));

    alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
    navigate('/');
  };

  return (
    <div className="container">
      <h2>회원가입</h2>
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
          회원가입
        </button>
      </form>
      <p>
        이미 회원이신가요? <Link to="/">로그인하기</Link>
      </p>
    </div>
  );
}

export default Register;