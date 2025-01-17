import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChartComponent from './Chart';
import OrderForm from './OrderForm';

function Dashboard() {
  const navigate = useNavigate();
  const [selectedSymbol, setSelectedSymbol] = useState('BTC/USDT');
  const [currentPrice, setCurrentPrice] = useState(0);
  const [tradeLogs, setTradeLogs] = useState([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      const mockPrice = (Math.random() * 1000 + 20000).toFixed(2);
      setCurrentPrice(mockPrice);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const handleTrade = (orderInfo) => {
    setTradeLogs((prevLogs) => [
      ...prevLogs,
      {
        id: prevLogs.length + 1,
        symbol: orderInfo.symbol,
        side: orderInfo.side,
        volume: orderInfo.volume,
        price: currentPrice,
        timestamp: new Date().toLocaleString(),
      },
    ]);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  return (
    <div style={{ width: '80%', margin: '30px auto', textAlign: 'center' }}>
      <h1>자동매매 대시보드</h1>
      <button onClick={handleLogout} className="button" style={{ float: 'right', width: 'auto' }}>
        로그아웃
      </button>

      <div style={{ marginTop: 40 }}>
        <label htmlFor="symbolSelect" style={{ marginRight: 10 }}>
          종목 선택:
        </label>
        <select
          id="symbolSelect"
          value={selectedSymbol}
          onChange={(e) => setSelectedSymbol(e.target.value)}
          className="input"
          style={{ width: '200px' }}
        >
          <option value="BTC/USDT">BTC/USDT</option>
          <option value="ETH/USDT">ETH/USDT</option>
          <option value="XRP/USDT">XRP/USDT</option>
          <option value="ADA/USDT">ADA/USDT</option>
        </select>
      </div>

      <h2 style={{ marginTop: 30 }}>
        현재 가격 ({selectedSymbol}): <span style={{ color: 'blue' }}>{currentPrice}</span> USDT
      </h2>

      <ChartComponent symbol={selectedSymbol} />
      <OrderForm symbol={selectedSymbol} onTrade={handleTrade} />

      <div style={{ marginTop: 40, textAlign: 'left' }}>
        <h3>매매 로그</h3>
        <ul>
          {tradeLogs.map((log) => (
            <li key={log.id}>
              [{log.timestamp}] {log.symbol} | {log.side.toUpperCase()} | 수량: {log.volume} | 체결가: {log.price} USDT
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;