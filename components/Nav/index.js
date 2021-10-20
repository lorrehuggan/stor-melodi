import React from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import { Howler } from 'howler';

const Nav = () => {
  const stop = () => {
    Howler.stop();
  };
  return (
    <nav className={styles.nav}>
      <section className={styles.container}>
        <div className={styles.innerContainer}>
          <span className={styles.logo}>Chune</span>
        </div>
        <div className={`${styles.innerContainer} ${styles.links}`}>
          <ul>
            <Link href="/" passHref onClick={stop()}>
              <li>Home</li>
            </Link>
            <Link href="/genre" passHref onClick={stop()}>
              <li>Genres</li>
            </Link>
            <Link href="/playlist" passHref onClick={stop()}>
              <li>Playlists</li>
            </Link>
            <Link href="/genre/hip-hop" passHref onClick={stop()}>
              <li>Hip-Hop</li>
            </Link>
            <Link href="/genre/pop" passHref onClick={stop()}>
              <li>Pop</li>
            </Link>
          </ul>
        </div>
      </section>
    </nav>
  );
};

export default Nav;
