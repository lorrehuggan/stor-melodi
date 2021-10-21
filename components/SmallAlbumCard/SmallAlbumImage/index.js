import React from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';
import Link from 'next/link';

const SmallAlbumImage = ({ src, name, href }) => {
  return (
    <div className={styles.item}>
      <Link href={href} passHref>
        <Image src={src} alt={name} height={260} width={260} />
      </Link>
    </div>
  );
};

export default SmallAlbumImage;
