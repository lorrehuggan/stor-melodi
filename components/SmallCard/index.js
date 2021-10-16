import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './styles.module.scss';

const SmallCard = ({ tracks }) => {
  const renderAllAlbums = () => {
    return tracks.map((track) => {
      return (
        <Link key={track.id} href={`/album/${track.album.id}`} passHref>
          <div className={styles.card}>
            <div className={styles.imageContainer}>
              <Image
                src={track.album.images[0].url}
                alt={track.album.name}
                width={250}
                height={250}
                className={styles.image}
              />
            </div>
            <div className={styles.albumInfo}>
              <p className={styles.albumName}>
                {`${track?.album.name.substring(0, 37)} ${
                  track?.album.name.length > 37 ? '...' : ''
                }`}
              </p>
              <p className={styles.albumArtist}>{track?.artists[0].name}</p>
            </div>
          </div>
        </Link>
      );
    });
  };
  return <>{renderAllAlbums()}</>;
};

export default SmallCard;
