import React from 'react';
import styles from './styles.module.scss';

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <section className={styles.container}>
        <div className={styles.innerContainer}>
          <span className={styles.logo}>Chune</span>
        </div>
        <div className={styles.innerContainer}>Menu</div>
      </section>
    </nav>
  );
};

export default Nav;
