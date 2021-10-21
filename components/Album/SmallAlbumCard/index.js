import React from 'react';
import SmallAlbumDetails from './SmallAlbumDetails';
import SmallAlbumImage from './SmallAlbumImage';
import styles from './styles.module.scss';

const SmallAlbumCard = ({ src, alt, title, name, href }) => {
  return (
    <div className={styles.card}>
      <SmallAlbumImage src={src} alt={alt} href={href} />
      <SmallAlbumDetails title={title} name={name} />
    </div>
  );
};

export default SmallAlbumCard;
