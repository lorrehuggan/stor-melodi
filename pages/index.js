import styles from '../styles/styles.module.scss';
import HeadTag from '../components/Head';
import React from 'react';
import { useAppStateValue } from '../context/AppProvider';
import { types } from '../reducers/appReducer';
import Link from 'next/link';

export default function Home() {
  const head = {
    title: 'Chune',
    description: 'The Music Discovery App',
    tags: ['music discovery', 'discovery', 'hip-hop', 'pop'],
  };

  return (
    <>
      <HeadTag
        title={head.title}
        description={head.description}
        tags={head.tags}
      />

      <main>Log in with spotify</main>
    </>
  );
}
