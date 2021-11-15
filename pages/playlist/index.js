import React from 'react';
import axios from 'axios';
import {
  FEATURED_PLAYLIST_ENDPOINT,
  GENRE_PLAYLIST_ENDPOINT,
  GET_ACCESS_TOKEN,
} from '../../lib/spotify';
import HeadTag from '../../components/Head';
import styles from './styles.module.scss';
import SmallAlbumCard from '../../components/Album/SmallAlbumCard';
import Link from 'next/link';
import Image from 'next/image';

const Playlist = ({ playlists }) => {
  const tags = [];
  playlists.map((playlist) => {
    return tags.push(playlist?.name);
  });

  const head = {
    title: 'Fresh Playlist',
    description: 'Discover Fresh New Playlist',
    tags: tags,
  };
  const renderPlaylists = () => {
    return playlists?.map((playlist) => {
      return (
        <SmallAlbumCard
          src={playlist?.images[0].url}
          alt={playlist?.name}
          key={playlist?.id}
          title={playlist?.name}
          name={playlist?.description}
          href={`/playlist/${playlist?.id}`}
        />
      );
    });
  };
  return (
    <>
      <HeadTag
        title={head.title}
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
          <div className={styles.gridContainer}>
            {playlists?.map((playlist) => {
              return (
                <div key={playlist?.id} className={styles.grid}>
                  <Link href={`/playlist/${playlist?.id}`}>
                    <a className={styles.imageAnchor}>
                      <Image
                        src={playlist?.images[0].url}
                        alt={playlist?.name}
                        layout="responsive"
                        width={254}
                        height={280}
                      />
                    </a>
                  </Link>
                </div>
              );
            })}
          </div>
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
  })
    .then((res) => res.data.playlists.items)
    .catch((err) => console.log(err));

  return {
    props: { playlists },
    revalidate: 86400,
  };
}
