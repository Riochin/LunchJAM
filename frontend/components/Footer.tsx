import React from "react";
import { FaUserCircle, FaChartLine } from "react-icons/fa"; // 追加
import Link from "next/link";
import styles from "./Footer.module.css";
import { FaHome } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link href="/qr" className={styles.button}>
        <FaHome className={styles.icon} />
      </Link>
      <Link href="/congestion" className={styles.button}>
        <FaChartLine className={styles.icon} />
      </Link>
      <Link href="/user" className={styles.button}>
        <FaUserCircle className={styles.icon} />
      </Link>
    </footer>
  );
};

export default Footer;
