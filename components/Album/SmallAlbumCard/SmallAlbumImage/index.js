import React from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';
import Link from 'next/link';

const SmallAlbumImage = ({ src, name, href }) => {
  return (
    <div className={styles.item}>
      <Link href={href}>
        <a className={styles.imageAnchor}>
          <Image
            layout="responsive"
            objectFit="cover"
            src={src}
            alt={name}
            height={260}
            width={260}
          />
        </a>
      </Link>
    </div>
  );
};

export default SmallAlbumImage;
