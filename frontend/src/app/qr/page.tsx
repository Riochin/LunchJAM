"use client";

import app from "../firebase"; // 上記のfirebaseConfig.jsをインポート

import React, { useEffect, useState } from "react";
import Footer from "../../../components/Footer";
import styles from "./QRPage.module.css"; // 追加
import { ChakraProvider } from "@chakra-ui/react";
import { BiQr } from "react-icons/bi";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Firebaseの認証機能を使用

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
        <h2 className={styles.title}>〇〇さんいらっしゃい</h2>
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
      </main>
      <Footer />
    </div>
  );
};

export default QRPage;
