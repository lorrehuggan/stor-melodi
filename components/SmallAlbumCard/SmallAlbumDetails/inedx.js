import React from 'react';
import styles from './styles.module.scss';

const SmallAlbumDetails = ({ title, name }) => {
  return (
    <div className={styles.albumInfo}>
      <p className={styles.albumName}>
        {`${title.substring(0, 19)}${title.length > 19 ? '...' : ''}`}
      </p>
      <p className={styles.albumArtist}>
        {`${name.substring(0, 19)}${name.length > 19 ? '...' : ''}`}
      </p>
    </div>
  );
};

export default SmallAlbumDetails;
