import React from "react";
import styles from "./Header.module.css";
import { FaBars } from "react-icons/fa";
import Link from "next/link";
import AuthButton from "./AuthButton";

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <Link href="/">
        <img src="images/logo.png" className={styles.icon} />
      </Link>
      <Link href="/">
        <div className={styles.headerText}>Lunch JAM</div>
      </Link>
      <AuthButton />
      <FaBars size="1.2rem" color="#333" className={styles.faBars} />
    </div>
  );
};

export default Header;
