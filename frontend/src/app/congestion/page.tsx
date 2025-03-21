// LunchJAM/frontend/src/app/congestion/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import styles from './CongestionPage.module.css';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
interface CongestionData {
  timestamp: string;
  visitors: number;
}

const CongestionPage: React.FC = () => {
  const [data, setData] = useState<CongestionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentVisitors, setCurrentVisitors] = useState<number>(0);
  const [latestDataTime, setLatestDataTime] = useState<string>('');

  // 混雑度に応じたスタイルを決定する関数
  const getCongestionStyle = (visitors: number) => {
    if (visitors > 90) {
      return styles.high;
    } else if (visitors >= 50) {
      return styles.medium;
    } else {
      return styles.low;
    }
  };

  // 混雑度に応じたメッセージを返す関数
  const getCongestionMessage = (visitors: number) => {
    if (visitors > 90) {
      return '混雑しています';
    } else if (visitors >= 50) {
      return 'やや混雑しています';
    } else {
      return '空いています';
    }
  };

  // 現在時刻を更新する関数
  const updateCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    setCurrentTime(`${hours}:${minutes}`);
  };

  useEffect(() => {
    // 現在時刻の更新を開始
    updateCurrentTime();
    const timeIntervalId = setInterval(updateCurrentTime, 1000);

    return () => clearInterval(timeIntervalId);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/status`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const rawData = await response.json();
        console.log('取得したデータ:', rawData);

        const processedData = rawData.map((item: any) => ({
          timestamp: formatTimestamp(item.timestamp),
          visitors: Math.floor(item.visitors),
        }));

        setData(processedData);

        // 最新のデータを現在の状況として設定
        if (processedData.length > 0) {
          const latest = processedData[processedData.length - 1];
          setCurrentVisitors(latest.visitors);
          setCurrentTime(latest.timestamp);
        }
      } catch (error) {
        console.error('データの取得に失敗しました:', error);
        setError('データの取得に失敗しました');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTimestamp = (utcTimestamp: string) => {
    const date = new Date(utcTimestamp);
    date.setHours(date.getHours() + 9);

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
  };

  if (isLoading) return <div className={styles.loading}>読み込み中...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (data.length === 0)
    return <div className={styles.noData}>データがありません</div>;

  return (
    <div className={styles.container}>
      <Header />
      <h1 className={styles.title}>食堂の混雑状況</h1>

      {/* 現在の状況を表示するセクション */}
      <div className={styles.currentStatus}>
        <div className={styles.currentTime}>現在時刻: {currentTime}</div>
        <div
          className={`${styles.currentVisitors} ${getCongestionStyle(
            currentVisitors
          )}`}
        >
          現在の人数: {currentVisitors}人
          <div className={styles.congestionMessage}>
            {getCongestionMessage(currentVisitors)}
          </div>
        </div>
      </div>

      {/* ツールバー */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarContent}>
          <div className={styles.toolbarSearch}>
            <span className={styles.toolbarSearchIcon}></span>
            <span>検索バー</span>
          </div>
          <span className={styles.toolbarMenuIcon}>☰</span>
        </div>
      </div>

      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              label={{ value: '時刻', position: 'bottom' }}
            />
            <YAxis
              label={{
                value: '人数',
                angle: -90,
                position: 'left',
              }}
              tickFormatter={(value) => Math.floor(value)}
            />
            <Tooltip
              formatter={(value) => [Math.floor(Number(value)), '人']}
              labelFormatter={(label) => `${label}`}
            />
            <Line
              type="monotone"
              dataKey="visitors"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <Footer />
    </div>
  );
};

export default CongestionPage;
