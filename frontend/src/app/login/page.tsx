'use client';

import { useState } from 'react';
import {
  handleGoogleLogin,
  handleEmailLogin,
  registerWithEmail,
  logout,
  getCurrentUser,
} from './auth';
import styles from './Login.module.css';
import googleIcon from './google-icon.png'; // Googleアイコンをインポート
import { useRouter } from 'next/navigation'; // 追加

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(getCurrentUser());
  const [showEmailFields, setShowEmailFields] = useState(false);
  const [activeTab, setActiveTab] = useState('ログイン'); // アクティブなタブの状態を追加
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false); // 追加
  const router = useRouter(); // 追加

  const handleGoogleLoginClick = async () => {
    const success = await handleGoogleLogin(); // ログイン成功時にtrueが返るように修正
    if (success) {
      setLoginSuccess(true);
      setTimeout(() => {
        setLoginSuccess(false);
        router.push('/'); // ルーティングページに移動
      }, 1500); // 1.5秒後にメッセージを消してルーティング
    }
  };

  const handleEmailLoginClick = async () => {
    await handleEmailLogin(email, password);
  };

  const handleRegisterClick = async () => {
    const registeredUser = await registerWithEmail(email, password);
    if (registeredUser) setUser(registeredUser);
  };

  const handleEmailButtonClick = () => {
    setShowEmailFields(true);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setShowEmailFields(tab === '登録');
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.title}>Lunch JAM</div>
      <div className={styles.title2}>〜食堂混雑可視化アプリ〜</div>
      <div className={styles.logo}>
        <img src="images/logo.png" alt="食堂混雑可視化APP" />
        {loginSuccess && (
          <div className={styles.successMessage}>ログイン成功！</div>
        )}{' '}
        {/* 追加 */}
      </div>
      <div className={styles.tabContainer}>
        <button
          className={`${styles.tabButton} ${
            activeTab === 'ログイン' ? styles.active : ''
          }`}
          onClick={() => handleTabClick('ログイン')}
        >
          ログイン
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === '登録' ? styles.active : ''
          }`}
          onClick={() => handleTabClick('登録')}
        >
          登録
        </button>
      </div>
      {!showEmailFields && (
        <>
          <button
            className={styles.googleLoginButton}
            onClick={handleGoogleLoginClick}
          >
            Googleでログイン
          </button>
          <button
            className={styles.emailLoginButton}
            onClick={handleEmailButtonClick}
          >
            メールアドレスでログイン
          </button>
        </>
      )}
      {showEmailFields && (
        <div className={styles.emailFields}>
          <input
            type="email"
            placeholder="メールアドレス"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="パスワード"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={styles.submitButton} onClick={handleRegisterClick}>
            登録
          </button>
        </div>
      )}
    </div>
  );
}
