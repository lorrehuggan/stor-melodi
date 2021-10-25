import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './styles.module.scss';
import { motion } from 'framer-motion';

const AlbumArt = ({ href, src, alt }) => {
  //animation
  const animations = {
    mainImage: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delay: 1,
          duration: 0.2,
          ease: 'easeOut',
        },
      },
    },
    blurredImage: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.3,
          ease: 'easeOut',
        },
      },
    },
  };
  return (
    <section className={styles.imageSection}>
      <motion.div
        variants={animations.mainImage}
        initial="hidden"
        animate="visible"
        className={styles.imageContainer}
      >
        <Link href={href} passHref>
          <a target="_blank">
            <Image
              className={styles.image}
              src={src}
              alt={alt}
              height={600}
              width={600}
            />
          </a>
        </Link>
      </motion.div>

      <motion.div
        variants={animations.blurredImage}
        initial="hidden"
        animate="visible"
        className={styles.blurredImageContainer}
      >
        <div className={`${styles.gradient} ${styles.gradientTop}`} />
        <div className={`${styles.gradient} ${styles.gradientBottom}`} />

        <Image
          className={styles.blurredImage}
          src={src}
          alt={alt}
          height={640}
          width={1024}
        />
      </motion.div>
    </section>
  );
};

export default AlbumArt;
