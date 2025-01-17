import React, { useState } from 'react';

function OrderForm({ symbol, onTrade, onBacktest }) {
  // 매수/매도
  const [side, setSide] = useState('buy');
  // 수량
  const [volume, setVolume] = useState(0);
  // 전략
  const [strategy, setStrategy] = useState('bollinger');

  // 주문 실행
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onTrade) {
      onTrade({
        symbol,
        side,
        volume,
        strategy,
      });
    }
    // 폼 초기화
    setVolume(0);
  };

  // 백테스트 버튼 클릭 시
  const handleBacktest = (e) => {
    e.preventDefault();
    if (onBacktest) {
      onBacktest({
        symbol,
        strategy,
      });
    } else {
      alert(`(백테스트) 심볼: ${symbol}, 전략: ${strategy}`);
    }
  };

  return (
    <div style={styles.orderFormContainer}>
      <h3>주문 전략 설정</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* 종목 표시 */}
        <div style={styles.formGroup}>
          <label>종목: </label>
          <span>{symbol}</span>
        </div>

        {/* 전략 선택 */}
        <div style={styles.formGroup}>
          <label>전략: </label>
          <select value={strategy} onChange={(e) => setStrategy(e.target.value)}>
            <option value="bollinger">볼린저밴드 전략</option>
            <option value="volatility">변동성 돌파 전략</option>
            <option value="ai">AI 예측 전략</option>
          </select>
        </div>

        {/* 매수/매도 선택 */}
        <div style={styles.formGroup}>
          <label>구분(매수/매도): </label>
          <select value={side} onChange={(e) => setSide(e.target.value)}>
            <option value="buy">매수</option>
            <option value="sell">매도</option>
          </select>
        </div>

        {/* 수량 입력 */}
        <div style={styles.formGroup}>
          <label>수량: </label>
          <input
            type="number"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
          />
        </div>

        <div style={styles.buttonGroup}>
          {/* 주문 실행 버튼 */}
          <button type="submit" style={styles.submitButton}>
            주문 실행
          </button>
          {/* 백테스트 버튼 */}
          <button
            type="button"
            style={styles.backtestButton}
            onClick={handleBacktest}
          >
            백테스트
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  orderFormContainer: {
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    width: '60%',
    textAlign: 'left',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  submitButton: {
    marginTop: '10px',
    padding: '10px',
    cursor: 'pointer',
    backgroundColor: '#4A90E2',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
  },
  backtestButton: {
    marginTop: '10px',
    padding: '10px',
    cursor: 'pointer',
    backgroundColor: '#E26A4A',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
  },
};

export default OrderForm;