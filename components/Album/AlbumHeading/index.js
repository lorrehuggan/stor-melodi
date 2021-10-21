import React from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useAppStateValue } from '../../../context/AppProvider';

const AlbumHeading = ({ artist, album, name, title, href, src, alt }) => {
  const [{ playing }, dispatch] = useAppStateValue();
  const songPlaying = playing ? styles.buttonPlaying : '';

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
          <a target="_blank">
            <Image
              src={src}
              alt={alt}
              width={100}
              height={100}
              objectFit="cover"
            />
          </a>
        </Link>
      </>
    ) : (
      <div style={{ width: '100px', height: '100px', borderRadius: '100%' }} />
    );
  };
  return (
    <section className={styles.heading}>
      <div className={`${styles.avatar} ${songPlaying}`}>{renderAvatar()}</div>
      <div className={styles.headingText}>{renderHeading()}</div>
    </section>
  );
};

export default AlbumHeading;
