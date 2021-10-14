import React from 'react';
import axios from 'axios';
import {
  GENRE_ENDPOINT,
  GET_ACCESS_TOKEN,
  RECOMMENDATIONS,
} from '../lib/spotify';
import HeadTag from '../components/Head';
import styles from '../styles/Genre.module.scss';
import GenreRecommendedTracks from '../components/GenreRecommendedTracks';

const Genre = ({ genre, tracks }) => {
  //set album titles to tags
  let tags = [];
  tracks.map((track) => {
    return tags.push(track.album.name);
  });

  //Head tag object
  const head = {
    title: genre,
    description: 'Best to place to find your next music experience',
    tags: tags.toString(),
  };
  return (
    <div>
      <HeadTag
        title={head.title}
        description={head.description}
        tags={head.tags}
      />

      <main className={styles.container}>
        <section className={styles.innerContainer}>
          <h1 className={styles.heading}>{genre}</h1>
        </section>
        <section className={styles.gridContainer}>
          <GenreRecommendedTracks tracks={tracks} />
        </section>
      </main>

      <footer></footer>
    </div>
  );
};

export default Genre;

export async function getStaticPaths() {
  let token = await GET_ACCESS_TOKEN();
  let genres = await axios(GENRE_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.data.genres);

  const paths = genres.map((genre) => {
    return { params: { genre } };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let token = await GET_ACCESS_TOKEN();
  let data = await axios(RECOMMENDATIONS + params.genre, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.data.tracks);

  return {
    props: { genre: params.genre, tracks: data },
  };
}
