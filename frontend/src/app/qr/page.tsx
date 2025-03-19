import React from 'react';
import Footer from '../../../components/Footer';
import styles from './QRPage.module.css'; // 追加
import { ChakraProvider } from '@chakra-ui/react';
import { BiQr } from 'react-icons/bi';

const QRPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.title}>〇〇さんいらっしゃい</h2>
        <div className={styles.qrContainer}>
          <div className={styles.qrCode}>
            <BiQr size="5rem" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default QRPage;
