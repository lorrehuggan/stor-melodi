import styles from '../styles/styles.module.scss';
import HeadTag from '../components/Head';
import React from 'react';
import {
  NEW_RELEASES_ENDPOINT,
  GET_ACCESS_TOKEN,
  ARTIST_ENDPOINT,
} from '../lib/spotify';
import axios from 'axios';
import SmallAlbumCard from '../components/SmallAlbumCard';
import Image from 'next/image';
import { intToString } from '../utils/intToString';
import Link from 'next/link';
import { BsSpotify } from 'react-icons/bs';

export default function Home({ newReleases, featured }) {
  console.log(featured);
  const head = {
    title: 'Chune',
    description: 'The Music Discovery App',
    tags: ['music discovery', 'discovery', 'hip-hop', 'pop'],
  };

  const renderNewReleases = () => {
    return newReleases.map((release) => {
      return (
        <SmallAlbumCard
          src={release.images[0].url}
          alt={release.name}
          key={release.id}
          title={release.name}
          name={release.artists[0].name}
          href={`/album/${release.id}`}
        />
      );
    });
  };

  const renderFeaturedImage = () => {
    return (
      <Image
        src={newReleases[0].images[0].url}
        alt="featured-image"
        layout="fill"
      />
    );
  };

  const renderDetails = () => {
    return (
      <>
        <span className={styles.spotifyLink}>
          Listen On Spotify
          <span>
            <BsSpotify />
          </span>
        </span>
        <h1>{newReleases[0]?.artists[0].name}</h1>
        <h3>{newReleases[0]?.name}</h3>
        {featured.followers.total ? (
          <h4>
            <span>{`${intToString(featured?.followers.total)}`}</span> Followers
          </h4>
        ) : (
          ''
        )}
      </>
    );
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
          {/* Featured Album */}
          <section className={styles.featured}>
            <div className={`${styles.feature} ${styles.image}`}>
              {renderFeaturedImage()}
            </div>
            <div className={`${styles.feature} ${styles.details}`}>
              {renderDetails()}
            </div>
          </section>
          {/* New Releases */}
          <section className={styles.newReleases}>
            <h2>New Releases</h2>
            <div className={styles.grid}>{renderNewReleases()}</div>
          </section>
        </section>
      </section>
    </>
  );
}

export async function getStaticProps() {
  let token = await GET_ACCESS_TOKEN();
  let newReleases = await axios(`${NEW_RELEASES_ENDPOINT}?limit=4`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.data.albums.items)
    .catch((error) => console.log(error));
  let featured = await axios(
    `${ARTIST_ENDPOINT}${await newReleases[0].artists[0].id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((res) => res.data)
    .catch((error) => console.log(error));

  return {
    props: { newReleases, featured },
  };
}
