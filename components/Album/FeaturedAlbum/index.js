import React from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { BsSpotify } from 'react-icons/bs';
import { intToString } from '../../../utils/intToString';
import { motion } from 'framer-motion';

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
  //Animation
  const imageVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,

      transition: {
        delay: 0.3,
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };
  const textVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,

      transition: {
        delay: 0.5,
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };
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
        <motion.h1>{artist}</motion.h1>
        {artist ? (
          <motion.h4>
            <span>{`${intToString(followers)}`}</span> Followers
          </motion.h4>
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
          <motion.div
            variants={imageVariant}
            initial="hidden"
            animate="visible"
            className={`${styles.feature} ${styles.image}`}
          >
            {renderFeaturedImage()}
          </motion.div>
          <motion.div
            variants={textVariant}
            initial="hidden"
            animate="visible"
            className={`${styles.feature} ${styles.details}`}
          >
            {renderFeaturedDetails()}
          </motion.div>
        </>
      ) : (
        <>
          <motion.div
            variants={textVariant}
            initial="hidden"
            animate="visible"
            className={`${styles.feature} ${styles.details}`}
          >
            {renderFeaturedDetails()}
          </motion.div>

          <motion.div
            variants={imageVariant}
            initial="hidden"
            animate="visible"
            className={`${styles.feature} ${styles.image}`}
          >
            {renderFeaturedImage()}
          </motion.div>
        </>
      )}
    </section>
  );
};

export default FeaturedAlbum;
