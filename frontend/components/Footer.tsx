import React from 'react';
import { FaUserCircle, FaChartLine } from 'react-icons/fa'; // 追加
import Link from 'next/link';
import { BiQr } from 'react-icons/bi';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link href="/user" className={styles.button}>
        <FaUserCircle className={styles.icon} />
      </Link>
      <Link href="/congestion" className={styles.button}>
        <FaChartLine className={styles.icon} />
      </Link>
      <Link href="/qr" className={styles.button}>
        <BiQr className={styles.icon} />
      </Link>
    </footer>
  );
};

export default Footer;
