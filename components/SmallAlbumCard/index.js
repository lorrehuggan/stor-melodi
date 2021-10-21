import React from 'react';
import SmallAlbumDetails from './SmallAlbumDetails/inedx';
import SmallAlbumImage from './SmallAlbumImage';
import styles from './styles.module.scss';

const SmallAlbumCard = ({ src, alt, key, title, name, href }) => {
  return (
    <div className={styles.card}>
      <SmallAlbumImage src={src} alt={alt} key={key} href={href} />
      <SmallAlbumDetails title={title} name={name} />
    </div>
  );
};

export default SmallAlbumCard;
