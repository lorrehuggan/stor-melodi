import React from 'react';
import Nav from '../Nav';
import Footer from '../Footer';
import styles from './styles.module.scss';

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <main className={styles.wrap}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
