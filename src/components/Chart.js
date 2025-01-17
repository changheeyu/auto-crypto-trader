import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

function ChartComponent({ symbol }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    // 단순히 mock 데이터로 시뮬레이션, API 미적용
    const mockData = [];
    for (let i = 0; i < 30; i++) {
      mockData.push({
        time: i,
        price: 20000 + Math.random() * 1000,
      });
    }
    setData(mockData);
  }, [symbol]);

  // Line 컴포넌트에 전달할 차트 데이터 구조
  const chartData = {
    labels: data.map((d) => d.time),
    datasets: [
      {
        label: `${symbol} Price`,
        data: data.map((d) => d.price),
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div style={{ width: '80%', margin: '0 auto', marginBottom: '30px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default ChartComponent;