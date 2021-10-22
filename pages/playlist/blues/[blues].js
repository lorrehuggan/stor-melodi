import React from 'react';
import axios from 'axios';
import {
  GET_ACCESS_TOKEN,
  FEATURED_PLAYLIST_ENDPOINT,
  PLAYLIST_ENDPOINT,
  GENRE_PLAYLIST_ENDPOINT,
} from '../../../lib/spotify';
import HeadTag from '../../../components/Head';
import styles from '../styles.module.scss';
import AlbumHeading from '../../../components/Album/AlbumHeading';
import AlbumArt from '../../../components/Album/AlbumArt';
import PlaylistTracklist from '../../../components/Album/PlaylistTracklist';

const Playlist = ({ blues }) => {
  let tags = [];
  blues.tracks.items.map((track) => {
    return tags.push(track.track.name);
  });
  const head = {
    title: blues.name,
    description: blues.description,
    tags: tags,
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
          <AlbumHeading
            artist={blues}
            album={blues}
            name={blues.description}
            title={blues.name}
            href={blues.external_urls.spotify}
            src={blues.images[0].url}
            alt={blues.name}
          />
          <AlbumArt
            href={blues.external_urls.spotify}
            src={blues.images[0].url}
            alt={blues.name}
          />
          <section className={styles.innerContainer}>
            <PlaylistTracklist
              album={blues}
              copyright={blues.description}
              type="Playlist"
            />
          </section>
        </section>
      </section>
    </>
  );
};

export default Playlist;

export async function getStaticPaths() {
  let token = await GET_ACCESS_TOKEN();
  let playlists = await axios(GENRE_PLAYLIST_ENDPOINT('blues', 20), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.data.playlists.items);

  const paths = playlists.map((playlist) => {
    return { params: { blues: playlist.id } };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let token = await GET_ACCESS_TOKEN();
  let data = await axios(`${PLAYLIST_ENDPOINT}${params.blues}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.data)
    .catch((error) => console.log(error));

  return {
    props: { blues: data },
  };
}
