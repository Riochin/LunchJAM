import React from 'react';
import styles from './Header.module.css'; // 追加
import AuthButton from './AuthButton'; // 追加

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <button className={styles.menuButton}>&#8801;</button>
        <h1 className={styles.title}>Lunuch JAM</h1>
        <AuthButton /> 
      </div>
    </header>
  );
};

export default Header;
