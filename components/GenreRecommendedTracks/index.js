import React from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';

const GenreRecommendedTracks = ({ tracks }) => {
  const renderAllAlbums = () => {
    return tracks.map((track) => {
      return (
        <div key={track.id} className={styles.card}>
          {/* <div className={styles.info}>
            <p>{track.album.name}</p>
          </div> */}

          <Image
            src={track.album.images[0].url}
            alt={track.album.name}
            width={250}
            height={250}
            className={styles.image}
          />
        </div>
      );
    });
  };
  return <div className={styles.container}>{renderAllAlbums()}</div>;
};

export default GenreRecommendedTracks;
