import React from 'react';
import Nav from '../Nav';
import Footer from '../Footer';
import styles from './styles.module.scss';
import { useAppStateValue } from '../../context/AppProvider';
import Menu from '../Menu';

const Layout = ({ children }) => {
  const [{ menuOpen }, dispatch] = useAppStateValue();
  return (
    <>
      <Nav />
      {menuOpen ? (
        <main className={styles.menu}>
          <Menu />
        </main>
      ) : (
        <main className={styles.wrap}>{children}</main>
      )}
      <Footer />
    </>
  );
};

export default Layout;
