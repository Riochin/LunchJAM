"use client";

import app from "../firebase"; // 上記のfirebaseConfig.jsをインポート

import React, { useEffect, useState } from "react";
import styles from "./QRPage.module.css"; // 追加
import { ChakraProvider } from "@chakra-ui/react";
import { BiQr } from "react-icons/bi";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Firebaseの認証機能を使用
import { BsQrCode } from "react-icons/bs";
import { FaUserCircle, FaChartLine } from "react-icons/fa"; // 追加
import {
  FaChevronLeft,
  FaBars,
  FaHamburger,
  FaMobileAlt,
  FaEnvelope,
  FaCamera,
} from "react-icons/fa";
import { PiCoinsDuotone } from "react-icons/pi";
import { VscAccount } from "react-icons/vsc";
import Link from "next/link";
import Header from "../../../components/Header";

const QRPage: React.FC = () => {
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
    if (userId) {
      // userId がある場合（ログインしている場合）
      const fetchQrCode = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/qr/get-qr/${userId}`,
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
        <div className={`${styles.ornament} ${styles.ornamentLeft}`}></div>
        <div className={`${styles.ornament} ${styles.ornamentRight}`}></div>
        <div className={styles.qrContainer}>
          {userId ? (
            qrUrl ? (
              <div className={styles.qrCode}>
                {/* Only render the <img> if qrUrl is available */}
                <img src={qrUrl || null} alt="User QR Code" />
              </div>
            ) : (
              <p>QRコードの読み込み中...</p>
            )
          ) : (
            <p>ログインしていないので、QRコードを表示できません。</p>
          )}
        </div>
        <div className={styles.text}>Scan Me</div>
        <div className={styles.buttonContainer}>
          <div className={styles.button}>
            <Link href="/congestion" className={styles.button}>
              <FaChartLine className={styles.icon} />
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
            <div className={styles.footerText}>Call-Action</div>
          </div>
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
