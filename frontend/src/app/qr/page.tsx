"use client";

import app from "../firebase"; // 上記のfirebaseConfig.jsをインポート

import React, { useEffect, useState } from "react";
import styles from "./QRPage.module.css"; // 追加
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Firebaseの認証機能を使用
import { FaChartLine } from "react-icons/fa"; // 追加
import { FaEnvelope, FaCamera } from "react-icons/fa";
import { PiCoinsDuotone } from "react-icons/pi";
import { VscAccount } from "react-icons/vsc";
import Link from "next/link";
import axios from "axios"; // 追加
import { FaExclamationTriangle, FaWalking, FaSmile } from "react-icons/fa"; // 追加
import { FaQuestionCircle } from "react-icons/fa"; // 追加

const QRPage: React.FC = () => {
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [congestionLevel, setCongestionLevel] = useState<
    "high" | "medium" | "low" | null
  >(null); // 追加

  useEffect(() => {
    const auth = getAuth(app);
    // Firebase の現在のユーザー情報を取得
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // ユーザーがログインしている場合、その UID を取得
        setUserId(user.uid);
      } else {
        // ログインしていない場合
        setUserId(null);
      }
      setIsLoading(false); // ロードが完了したことを示す
    });

    // クリーンアップ
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const fetchCongestionData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/cafeteria-status`,
        );
        console.log("レスポンスデータ:", response.data);

        if (
          response.data &&
          response.data.current_visitors !== undefined &&
          response.data.current_visitors !== null
        ) {
          const occupancy = response.data.current_visitors;
          const capacity = 5;

          const occupancyRate = (occupancy / capacity) * 100;

          if (occupancyRate > 90) {
            setCongestionLevel("high");
          } else if (occupancyRate >= 50) {
            setCongestionLevel("medium");
          } else {
            setCongestionLevel("low");
          }
        } else {
          console.log("混雑状況:low (0人またはデータなし)");
          setCongestionLevel("null"); // null を設定
        }
      } catch (error) {
        console.error("混雑状況の取得に失敗しました:", error);
        setCongestionLevel(null);
      }
    };

    fetchCongestionData();
    const intervalId = setInterval(fetchCongestionData, 60000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (userId) {
      // userId がある場合（ログインしている場合）
      const fetchQrCode = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/qr/get-qr/${userId}?size=200`,
          );
          if (response.ok) {
            const data = await response.json(); // もしバックエンドがJSON形式でURLを返している場合
            setQrUrl(data.qr_url); // 返ってきたURLを状態にセット
          } else {
            console.error("QRコードの取得に失敗しました");
          }
        } catch (error) {
          console.error("エラーが発生しました:", error);
        }
      };

      fetchQrCode();
    }
  }, [userId]); // userIdが変更されるたびに再取得

  if (isLoading) {
    return <div>Loading...</div>; // ローディング中のメッセージ
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* ユーザー名表示 */}
        {userId && <div className={styles.username}>usernameさん</div>}
        <div className={styles.qrContainer}>
          {userId ? (
            qrUrl ? (
              <div className={styles.qrCode}>
                <img src={qrUrl || null} alt="User QR Code" />
              </div>
            ) : (
              <p>QRコードの読み込み中...</p>
            )
          ) : (
            <p>ログインしていないので、QRコードを表示できません。</p>
          )}
        </div>
        {/* スペーサー追加 */}
        <div className={styles.spacerQR}></div>
        <div className={styles.congestionIcon}>
          <div className={styles.congestionLabel}>〜食堂の混雑状況〜</div>
          {congestionLevel === "high" && (
            <div>
              <img src="images/crowd.png" className={styles.congestionImage} />
              <div className={styles.congestionText}>
                混雑しています（赤色）
              </div>
            </div>
          )}
          {congestionLevel === "medium" && (
            <div>
              <img src="images/medium.png" className={styles.congestionImage} />
              <div className={styles.congestionText}>ふつう（オレンジ色）</div>
            </div>
          )}
          {congestionLevel === "low" && (
            <div>
              <img src="images/low.png" className={styles.congestionImage} />
              <div className={styles.congestionText}>空いています</div>
            </div>
          )}
          {congestionLevel === "null" && (
            <div className={styles.congestionContainer}>
              <img src="images/low.png" className={styles.congestionImage} />
              <div className={styles.congestionText}>空いています</div>
            </div>
          )}{" "}
          {/* 追加 */}
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.button}>
            <Link href="/congestion" className={styles.button}>
              <FaChartLine size="2rem" />
            </Link>
            <div className={styles.buttonText}>混雑グラフ</div>
          </div>
          <div className={styles.button}>
            <Link href="/mypoint" className={styles.button}>
              <PiCoinsDuotone size="2rem" />
            </Link>
            <div className={styles.buttonText}>マイポイント</div>
          </div>
          <div className={styles.button}>
            <Link href="/mypage" className={styles.button}>
              <VscAccount size="2rem" />
            </Link>
            <div className={styles.buttonText}>マイページ</div>
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.footerItem}>
            <div className={styles.footerIcon}>
              <FaEnvelope size="1rem" />
            </div>
            <div className={styles.footerText}>お知らせ</div>
          </div>
          <div className={styles.spacer}></div> {/* 追加 */}
          <div className={styles.footerItem}>
            <div className={styles.footerIcon}>
              <FaCamera size="1rem" />
            </div>
            <div className={styles.footerText}>カメラ</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QRPage;
