import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './styles.module.scss';

const AlbumArt = ({ href, src, alt }) => {
  return (
    <section className={styles.imageSection}>
      <Link href={href} passHref>
        <a target="_blank" className={styles.imageContainer}>
          <Image
            className={styles.image}
            src={src}
            alt={alt}
            height={600}
            width={600}
          />
        </a>
      </Link>

      <div className={styles.blurredImageContainer}>
        <div className={`${styles.gradient} ${styles.gradientTop}`} />
        <div className={`${styles.gradient} ${styles.gradientBottom}`} />

        <Image
          className={styles.blurredImage}
          src={src}
          alt={alt}
          height={640}
          width={1024}
        />
      </div>
    </section>
  );
};

export default AlbumArt;
