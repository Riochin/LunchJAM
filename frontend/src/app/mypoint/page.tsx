"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { auth } from "../firebase"; // Firebase Authのインスタンス
const POINTS_RANKS = [
  { name: "ブロンズ", min: 0 },
  { name: "シルバー", min: 10 },
  { name: "ゴールド", min: 30 },
  { name: "プラチナ", min: 50 },
];

const REWARDS = [
  { name: "ドリンク1杯無料", cost: 10 },
  { name: "おにぎり1個無料", cost: 15 },
  { name: "ランチ50円引き", cost: 20 },
  { name: "ランチ1回無料", cost: 50 },
];

// 進捗バーの代替
const ProgressBar: React.FC<{ value: number }> = ({ value }) => {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#ddd",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${value}%`,
          backgroundColor: "#FBBF24", // 黄色
          height: "8px",
          transition: "width 0.5s ease-in-out",
        }}
      />
    </div>
  );
};

const PointsPage: React.FC = () => {
  const [points, setPoints] = useState<number>(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserPoints = async () => {
      try {
        const currentUser = auth.currentUser;

        if (!currentUser) {
          setError("ログインが必要です");
          setIsLoading(false);
          return;
        }

        // IDトークンを取得
        const idToken = await currentUser.getIdToken();

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          setPoints(data.points || 0);
          setUserId(data.id);
          setUserName(data.name);
        } else {
          const errorData = await response.json();
          setError(errorData.detail || "ポイント情報の取得に失敗しました");
        }
      } catch (error) {
        console.error("エラーが発生しました:", error);
        setError("データの取得中にエラーが発生しました");
      } finally {
        setIsLoading(false);
      }
    };

    // 認証状態の監視を追加
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserPoints();
      } else {
        setError("ログインが必要です");
        setIsLoading(false);
      }
    });

    // クリーンアップ
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  const userRank =
    POINTS_RANKS.find(
      (rank, index) =>
        points >= rank.min &&
        (index === POINTS_RANKS.length - 1 ||
          points < POINTS_RANKS[index + 1].min),
    )?.name || "ブロンズ";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "16px",
      }}
    >
      {/* ポイントカード */}
      <Card
        style={{
          width: "100%",
          maxWidth: "350px",
          backgroundColor: "#FEF3C7",
          border: "1px solid #FBBF24",
          boxShadow: "3px 3px 10px rgba(0,0,0,0.1)",
        }}
      >
        <CardHeader>
          <CardTitle style={{ textAlign: "center", fontSize: "20px" }}>
            ポイントカード
          </CardTitle>
        </CardHeader>
        <CardContent style={{ textAlign: "center" }}>
          <p style={{ fontSize: "36px", fontWeight: "bold", color: "#D97706" }}>
            {points} pt
          </p>
          <p style={{ fontSize: "12px", color: "#555" }}>会員番号: {userId}</p>
          <p style={{ fontSize: "18px", fontWeight: "600" }}>
            ランク: {userRank}
          </p>
          <ProgressBar value={(points % 10) * 10} />
        </CardContent>
      </Card>

      {/* 特典リスト */}
      <div style={{ width: "100%", maxWidth: "350px", marginTop: "20px" }}>
        <h2
          style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}
        >
          🎁 引き換え可能な特典
        </h2>
        <ul
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "12px",
            backgroundColor: "#fff",
            boxShadow: "2px 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          {REWARDS.map((reward) => (
            <li
              key={reward.name}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "4px 0",
              }}
            >
              <span>{reward.name}</span>
              <span style={{ color: "#D97706", fontWeight: "bold" }}>
                {reward.cost} pt
              </span>
            </li>
          ))}
        </ul>
      </div>

      <Footer />
    </div>
  );
};

export default PointsPage;
