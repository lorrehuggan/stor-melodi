import React from 'react';
import styles from './styles.module.scss';
import { BsSpotify } from 'react-icons/bs';
import Link from 'next/link';
import { types } from '../../reducers/appReducer';
import { useAppStateValue } from '../../context/AppProvider';
import { FaUserCircle } from 'react-icons/fa';
import { AUTHENTICATION_ENDPOINT } from '../../lib/spotify';
import Router from 'next/router';

const Menu = () => {
  const [{ user, menuOpen }, dispatch] = useAppStateValue();
  //set menu state when route changes
  Router.events.on('routeChangeComplete', () =>
    dispatch({
      type: types.SET_MENU_OPEN,
      menuOpen: false,
    })
  );

  return (
    <section className={styles.container}>
      <div className={styles.heading}>
        <span className={styles.menu}>Menu</span>
        <span></span>
      </div>
      <div className={styles.items}>
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

          {user ? (
            <Link href="/user" passHref>
              <li>My Account</li>
            </Link>
          ) : (
            <Link href={AUTHENTICATION_ENDPOINT} passHref>
              <li className={styles.userLogin}>
                Login
                <span className={styles.logo}>
                  <BsSpotify />
                </span>
              </li>
            </Link>
          )}
        </ul>
      </div>
    </section>
  );
};

export default Menu;
