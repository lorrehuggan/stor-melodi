import React from 'react';
import axios from 'axios';
import {
  FEATURED_PLAYLIST_ENDPOINT,
  GET_ACCESS_TOKEN,
} from '../../lib/spotify';
import HeadTag from '../../components/Head';
import styles from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';

const Playlist = ({ playlists }) => {
  console.log(playlists);
  const head = {
    title: '',
    description: '',
    tags: '',
  };
  const renderPlaylists = () => {
    return playlists.map((playlist) => {
      return (
        <div key={playlist.id} className={styles.grid}>
          <Link href={`/playlist/${playlist.id}`} passHref>
            <Image
              src={playlist.images[0].url}
              alt={playlist.name}
              layout="fill"
            />
          </Link>
        </div>
      );
    });
  };
  return (
    <>
      <HeadTag
        title={head.tag}
        description={head.description}
        tags={head.tags}
      />
      <section className={styles.container}>
        <section className={styles.innerContainer}>
          <div className={styles.headingContainer}>
            <h1 className={styles.heading}>Playlist</h1>
            <span className={styles.subTitle}>A Curated List Of Playlist</span>
          </div>
        </section>
        <section>
          <div className={styles.gridContainer}>{renderPlaylists()}</div>
        </section>
      </section>
    </>
  );
};

export default Playlist;

export async function getStaticProps() {
  let token = await GET_ACCESS_TOKEN();
  let playlists = await axios(FEATURED_PLAYLIST_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.data.playlists.items);

  return {
    props: { playlists },
  };
}
