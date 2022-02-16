import React from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { BsSpotify } from 'react-icons/bs';
import { intToString } from '../../../utils/intToString';
import { motion } from 'framer-motion';

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
  return (
    <section className={styles.featured}>
      {layout ? (
        <>
          <FeaturedImage image={image} link={link} />
          <FeaturedDetails
            artist={artist}
            followers={followers}
            albumType={albumType}
            title={title}
            href={href}
            newAlbum={newAlbum}
          />
        </>
      ) : (
        <>
          <FeaturedDetails
            artist={artist}
            followers={followers}
            albumType={albumType}
            title={title}
            href={href}
            newAlbum={newAlbum}
          />
          <FeaturedImage image={image} link={link} />
        </>
      )}
    </section>
  );
};

export default FeaturedAlbum;

const FeaturedDetails = ({
  artist,
  followers,
  albumType,
  title,
  href,
  newAlbum,
}) => {
  return (
    <motion.div
      variants={textVariant}
      initial="hidden"
      animate="visible"
      className={`${styles.feature} ${styles.details}`}
    >
      <span className={styles.recommended}>recommended</span>
      <motion.h1>{`${artist.substring(0, 15)}${
        artist.length > 15 ? '...' : ''
      }`}</motion.h1>
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
    </motion.div>
  );
};

const FeaturedImage = ({ image, link }) => {
  return (
    <motion.div
      variants={imageVariant}
      initial="hidden"
      animate="visible"
      className={`${styles.feature} ${styles.image}`}
    >
      <Link href={`/album/${link}`} passHref>
        <Image src={image} alt="featured-image" layout="fill" />
      </Link>
    </motion.div>
  );
};
