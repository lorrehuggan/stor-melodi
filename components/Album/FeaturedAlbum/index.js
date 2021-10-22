import React from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { BsSpotify } from 'react-icons/bs';
import { intToString } from '../../../utils/intToString';

const FeaturedAlbum = ({
  image,
  artist,
  followers,
  albumType,
  title,
  href,
  layout,
  newAlbum,
  link,
}) => {
  const renderFeaturedImage = () => {
    return (
      <Link href={`/album/${link}`} passHref>
        <div className={styles.featuredImageContainer}>
          <Image src={image} alt="featured-image" layout="fill" />
        </div>
      </Link>
    );
  };

  const renderFeaturedDetails = () => {
    return (
      <>
        <span className={styles.recommended}>recommended</span>
        <h1>{artist}</h1>
        {artist ? (
          <h4>
            <span>{`${intToString(followers)}`}</span> Followers
          </h4>
        ) : (
          ''
        )}
        {newAlbum ? (
          <span className={styles.albumType}>NEW {albumType}</span>
        ) : (
          <span>{albumType}</span>
        )}
        <h3>{`${title.substring(0, 20)}${title.length > 20 ? '...' : ''}`}</h3>
        <Link href={href} passHref>
          <span className={styles.spotifyLink}>
            Listen Now On Spotify
            <span>
              <BsSpotify />
            </span>
          </span>
        </Link>
      </>
    );
  };

  return (
    <section className={styles.featured}>
      {layout ? (
        <>
          <div className={`${styles.feature} ${styles.image}`}>
            {renderFeaturedImage()}
          </div>
          <div className={`${styles.feature} ${styles.details}`}>
            {renderFeaturedDetails()}
          </div>
        </>
      ) : (
        <>
          <div className={`${styles.feature} ${styles.details}`}>
            {renderFeaturedDetails()}
          </div>

          <div className={`${styles.feature} ${styles.image}`}>
            {renderFeaturedImage()}
          </div>
        </>
      )}
    </section>
  );
};

export default FeaturedAlbum;
