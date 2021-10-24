import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import { Howler } from 'howler';
import {
  AUTHENTICATION_ENDPOINT,
  GET_URL_RESPONSE_TOKEN,
} from '../../lib/spotify';
import { useAppStateValue } from '../../context/AppProvider';
import { FaUserCircle } from 'react-icons/fa';

const Nav = () => {
  const [{ userToken, user }, dispatch] = useAppStateValue();

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
            {user ? (
              <Link href={user.external_urls.spotify} passHref onClick={stop()}>
                <li className={styles.userName}>
                  <span>
                    <FaUserCircle />
                  </span>
                  {user.display_name}
                </li>
              </Link>
            ) : (
              <Link href={AUTHENTICATION_ENDPOINT} passHref onClick={stop()}>
                <li className={styles.userLogin}>Spotify Login</li>
              </Link>
            )}
          </ul>
        </div>
      </section>
    </nav>
  );
};

export default Nav;
