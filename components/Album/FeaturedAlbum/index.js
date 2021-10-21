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
}) => {
  const renderFeaturedImage = () => {
    return (
      <div className={styles.featuredImageContainer}>
        <Image src={image} alt="featured-image" layout="fill" />
      </div>
    );
  };

  const renderFeaturedDetails = () => {
    return (
      <>
        <h1>{artist}</h1>
        {artist ? (
          <h4>
            <span>{`${intToString(followers)}`}</span> Followers
          </h4>
        ) : (
          ''
        )}
        <span className={styles.albumType}>NEW {albumType}</span>
        <h3>{`${title.substring(0, 25)}${title.length > 25 ? '...' : ''}`}</h3>
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
