import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';

import { useAppStateValue } from '../../../../context/AppProvider';

const SmallAlbumDetails = ({ title, name }) => {
  const [{ windowSize }, dispatch] = useAppStateValue();
  const [string, setString] = useState(19);

  // set album string length based on window size
  useEffect(() => {
    if (windowSize <= 430) {
      setString(10);
    } else {
      setString(19);
    }
    return;
  }, [windowSize]);

  return (
    <div className={styles.albumInfo}>
      <p className={styles.albumName}>
        {`${title.substring(0, string)}${title.length > string ? '...' : ''}`}
      </p>
      <p className={styles.albumArtist}>
        {`${name.substring(0, string)}${name.length > string ? '...' : ''}`}
      </p>
    </div>
  );
};

export default SmallAlbumDetails;
