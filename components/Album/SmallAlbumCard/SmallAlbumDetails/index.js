import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';

const SmallAlbumDetails = ({ title, name }) => {
  const [aName, setAName] = useState(19);
  const [aTitle, setATitle] = useState(19);

  // set album string length based on window size
  useEffect(() => {
    if (window.innerWidth <= 430) {
      setATitle(10);
      setAName(13);
    } else {
      setAName(19);
      setATitle(19);
    }
    return;
  }, []);

  return (
    <div className={styles.albumInfo}>
      <p className={styles.albumName}>
        {`${title.substring(0, aTitle)}${title.length > aTitle ? '...' : ''}`}
      </p>
      <p className={styles.albumArtist}>
        {`${name.substring(0, aName)}${name.length > aName ? '...' : ''}`}
      </p>
    </div>
  );
};

export default SmallAlbumDetails;
