"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { BrowserQRCodeReader } from "@zxing/library";
import styles from "./scanner.module.css";

const ScannerPage: React.FC = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const lastScannedRef = useRef<string | null>(null);
  const scanTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  const handleQRCode = async (data: string) => {
    if (isProcessing) return;
    if (data === lastScannedRef.current) return;

    setIsProcessing(true);
    lastScannedRef.current = data;
    setScanResult(data);
    setError(null);

    const requestBody = { user_id: data };
    console.log("送信するリクエスト:", {
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/visits/check-in-out`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: requestBody,
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/visits/check-in-out`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        },
      );

      console.log("レスポンスステータス:", response.status);
      const responseData = await response.json();
      console.log("レスポンスデータ:", responseData);

      if (response.ok) {
        // レスポンスのメッセージを表示
        alert(responseData.message);
      } else {
        setError(`入退室記録に失敗しました: ${JSON.stringify(responseData)}`);
      }
    } catch (err) {
      console.error("APIエラーの詳細:", err);
      setError(
        `エラーが発生しました: ${err instanceof Error ? err.message : String(err)}`,
      );
    } finally {
      if (scanTimeoutRef.current) {
        clearTimeout(scanTimeoutRef.current);
      }
      scanTimeoutRef.current = setTimeout(() => {
        setIsProcessing(false);
        lastScannedRef.current = null;
      }, 1000);
    }
  };

  useEffect(() => {
    const codeReader = new BrowserQRCodeReader();
    console.log("QRコードリーダーを初期化");

    const startScanning = async () => {
      try {
        console.log("スキャン開始...");
        setIsScanning(true);

        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput",
        );
        console.log("利用可能なカメラ:", videoDevices);

        const selectedDevice =
          videoDevices.find(
            (device) =>
              device.label.toLowerCase().includes("back") ||
              device.label.toLowerCase().includes("rear"),
          ) || videoDevices[0];

        console.log("選択されたカメラ:", selectedDevice?.label);

        await codeReader.decodeFromVideoDevice(
          selectedDevice?.deviceId,
          "video",
          (result, error) => {
            if (result) {
              const data = result.getText();
              handleQRCode(data);
            }
          },
        );
      } catch (err) {
        console.error("スキャン開始エラー:", err);
        setError("カメラの起動に失敗しました");
        setIsScanning(false);
      }
    };

    startScanning();

    return () => {
      console.log("クリーンアップ実行");
      if (scanTimeoutRef.current) {
        clearTimeout(scanTimeoutRef.current);
      }
      codeReader.reset();
      setIsScanning(false);
    };
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>QRコードをスキャン</h2>

      <div className={styles.scanner}>
        <video
          id="video"
          style={{ width: "100%", maxHeight: "70vh" }}
          playsInline
          autoPlay
        />
      </div>

      {isProcessing ? (
        <div className={styles.processing}>処理中...</div>
      ) : isScanning ? (
        <div className={styles.scanning}>QRコードをかざしてください</div>
      ) : null}

      {scanResult && !isProcessing && (
        <p className={styles.result}>読み取り結果: {scanResult}</p>
      )}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default ScannerPage;
