import React from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useAppStateValue } from '../../../context/AppProvider';
import { motion } from 'framer-motion';
import useScreenSize from '../../../hooks/useScreenWidth';

const AlbumHeading = ({ artist, album, name, title, href, src, alt }) => {
  const { smallScreen } = useScreenSize(430);
  const [{ playing }, dispatch] = useAppStateValue();
  const songPlaying = playing ? styles.buttonPlaying : '';

  const animations = {
    heading: {
      hidden: { opacity: 0, y: 15 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { ease: 'easeOut', duration: 0.6, delay: 0.8 },
      },
    },
  };

  const renderHeading = () => {
    return album ? (
      <>
        <h4 className={styles.artistName}>{name}</h4>
        <h2 className={styles.albumTitle}>{title}</h2>
      </>
    ) : (
      //Error Message
      <>
        <h4 className={styles.artistName}>We Apologise</h4>
        <h2 className={styles.albumTitle}>Seems To Be An Error</h2>
      </>
    );
  };
  const renderAvatar = () => {
    return artist ? (
      <>
        <Link href={href} passHref>
          <a target="_blank" className={`${styles.avatar} ${songPlaying}`}>
            <Image src={src} alt={alt} layout="fill" objectFit="cover" />
          </a>
        </Link>
      </>
    ) : (
      <div style={{ width: '100px', height: '100px', borderRadius: '100%' }} />
    );
  };
  return (
    <motion.section
      variants={animations.heading}
      initial="hidden"
      animate="visible"
      className={styles.heading}
    >
      <div>{renderAvatar()}</div>
      <div className={styles.headingText}>{renderHeading()}</div>
    </motion.section>
  );
};

export default AlbumHeading;
