import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import { Howler } from 'howler';
import { AUTHENTICATION_ENDPOINT } from '../../lib/spotify';
import { useAppStateValue } from '../../context/AppProvider';
import { FaUserCircle } from 'react-icons/fa';
import { BsSpotify } from 'react-icons/bs';
import { types } from '../../reducers/appReducer';
import useScreenSize from '../../hooks/useScreenWidth';

const Nav = () => {
  const [{ user, menuOpen }, dispatch] = useAppStateValue();
  const { smallScreen } = useScreenSize(810);

  const stop = () => {
    Howler.stop();
  };

  const lines = {
    transform: menuOpen ? 'rotate(180deg)' : '',
  };

  const btn = {
    transform: menuOpen ? 'rotate(-90deg)' : '',
  };

  const buttonHandler = () => {
    dispatch({
      type: types.SET_MENU_OPEN,
      menuOpen: !menuOpen,
    });
  };

  return (
    <nav className={styles.nav}>
      <section className={styles.container}>
        <div className={styles.innerContainer}>
          <Link href="/" passHref>
            <span className={styles.logo}>StorMelodi</span>
          </Link>
        </div>
        {user ? (
          <div className={styles.mobileUser}>
            <Link href="/user" passHref>
              My Profile
            </Link>
          </div>
        ) : (
          ''
        )}

        <div className={`${styles.innerContainer} ${styles.links}`}>
          {/*Menu Button*/}
          {smallScreen ? (
            <div className={styles.buttonContainer}>
              <div onClick={buttonHandler} style={btn}>
                <span style={lines}></span>
              </div>
            </div>
          ) : (
            ''
          )}

          <ul onClick={stop}>
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
            {user ? (
              <Link href="/user" passHref>
                <li className={styles.userName}>
                  <span>
                    <FaUserCircle />
                  </span>
                  {user?.display_name}
                </li>
              </Link>
            ) : (
              <Link href={AUTHENTICATION_ENDPOINT} passHref>
                <li className={styles.userLogin}>
                  <span>
                    <BsSpotify />
                    Spotify Login
                  </span>
                </li>
              </Link>
            )}
          </ul>
        </div>
      </section>
    </nav>
  );
};

export default Nav;
