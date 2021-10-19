import React from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <section className={styles.container}>
        <div className={styles.innerContainer}>
          <span className={styles.logo}>Chuune</span>
        </div>
        <div className={`${styles.innerContainer} ${styles.links}`}>
          <ul>
            <Link href="/" passHref>
              <li>Home</li>
            </Link>
            <Link href="/genre" passHref>
              <li>Genres</li>
            </Link>
            <Link href="/playlist" passHref>
              <li>Playlists</li>
            </Link>
            <Link href="/genre/hip-hop" passHref>
              <li>Hip-Hop</li>
            </Link>
            <Link href="/genre/pop" passHref>
              <li>Pop</li>
            </Link>
          </ul>
        </div>
      </section>
    </nav>
  );
};

export default Nav;
