import React from 'react';
import styles from './Header.module.css';
import { FaChevronLeft, FaBars } from 'react-icons/fa';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <Link href="/">
        <img src="images/chef.png" className={styles.icon} />
      </Link>
      <div className={styles.headerTextContainer}>
        {' '}
        {/* div要素に変更 */}
        <Link href="/">
          <div className={styles.headerText}>Lunch JAM</div>
        </Link>
      </div>
      <FaBars size="1.2rem" color="#333" />
    </div>
  );
};

export default Header;
