import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './styles.module.scss';

const SmallCard = ({ tracks }) => {
  const renderAllAlbums = () => {
    return tracks.map((track) => {
      return (
        <Link key={track.id} href={`album/${track.album.id}`} passHref>
          <div className={styles.card}>
            <Image
              src={track.album.images[0].url}
              alt={track.album.name}
              width={250}
              height={250}
              className={styles.image}
            />
          </div>
        </Link>
      );
    });
  };
  return <>{renderAllAlbums()}</>;
};

export default SmallCard;
