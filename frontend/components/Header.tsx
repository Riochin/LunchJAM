import React from 'react';
import styles from './Header.module.css';
import { FaChevronLeft, FaBars } from 'react-icons/fa';

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <img src="images/chef.png" className={styles.icon} />
      <div className={styles.headerText}>Lunch JAM</div>
      <FaBars size="1.2rem" color="#333" />
    </div>
  );
};

export default Header;
