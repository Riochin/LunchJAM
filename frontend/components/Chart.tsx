import React, { useState, useEffect } from "react";
import axios from "axios";

function Chart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/chart-data"); // APIエンドポイント
        setChartData(response.data);
      } catch (error) {
        console.error("データの取得に失敗しました:", error);
      }
    }
    fetchData();
  }, []);

  // ... グラフ描画処理 ...
}

export default Chart;
