import React from 'react';
import styles from './styles.module.scss';
import { BsSpotify, BsTwitter, BsYoutube, BsInstagram } from 'react-icons/bs';
import Link from 'next/link';

const Footer = () => {
  const socialIcons = [
    { logo: BsTwitter },
    { logo: BsYoutube },
    { logo: BsInstagram },
    { logo: BsSpotify },
  ];

  const socialLinks = () => {
    return socialIcons.map((icon, idx) => {
      return (
        <span key={idx} className={styles.icon}>
          <icon.logo />
        </span>
      );
    });
  };

  return (
    <footer className={styles.footer}>
      <section className={styles.gridContainer}>
        <div className={`${styles.grid} ${styles.gridLeft}`}>
          <span className={styles.spotify}>
            <BsSpotify />
          </span>
          <span className={styles.message}>
            Powered By <Link href="https://www.spotify.com/">Spotify</Link>
          </span>
          <span className={styles.createdBy}>Created by @HugganLorre</span>
        </div>
        <div className={`${styles.grid} ${styles.gridRight}`}>
          {socialLinks()}
        </div>
      </section>
    </footer>
  );
};

export default Footer;
