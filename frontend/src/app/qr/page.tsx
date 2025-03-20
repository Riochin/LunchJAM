import React from 'react';
import styles from './QRPage.module.css';
import { BsQrCode } from 'react-icons/bs';
import { FaUserCircle, FaChartLine } from 'react-icons/fa'; // 追加
import {
  FaChevronLeft,
  FaBars,
  FaHamburger,
  FaMobileAlt,
  FaEnvelope,
  FaCamera,
} from 'react-icons/fa';
import { PiCoinsDuotone } from 'react-icons/pi';
import { VscAccount } from 'react-icons/vsc';
import Link from 'next/link';
import Header from '../../../components/Header';

const QRPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={`${styles.ornament} ${styles.ornamentLeft}`}></div>
        <div className={`${styles.ornament} ${styles.ornamentRight}`}></div>
        <div className={styles.qrContainer}>
          <div className={styles.qrCode}>
            <BsQrCode size="8rem" />
          </div>
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
