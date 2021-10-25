import React, { useState } from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';
import Link from 'next/link';
import { motion } from 'framer-motion';

const SmallAlbumImage = ({ src, name, href, idx }) => {
  const imageAnimation = {
    hidden: { opacity: 0, y: -10, rotate: 2 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        delay: idx * 0.2,
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div variants={imageAnimation} initial="hidden" animate="visible">
      <motion.div className={styles.item}>
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
      </motion.div>
    </motion.div>
  );
};

export default SmallAlbumImage;
