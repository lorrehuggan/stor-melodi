import axios from 'axios';
import React, { useEffect } from 'react';
import HeadTag from '../../components/Head';
import {
  ALBUM_ENDPOINT,
  GET_ACCESS_TOKEN,
  ARTIST_ENDPOINT,
} from '../../lib/spotify';
import styles from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { BsFillPlayCircleFill } from 'react-icons/bs';

const Album = ({ album }) => {
  console.log(album);

  let tags = [];
  album?.tracks.items.map((song) => {
    return tags.push(song.name);
  });

  const head = {
    title: `${album.name} - ${album.artists[0].name}`,
    description: `${album.name} - ${album.artists[0].name}`,
    tags: tags,
  };

  function MsToMinsAndSeconds(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return seconds == 60
      ? minutes + 1 + ':00'
      : minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  const renderTracks = () => {
    return album.tracks.items.map((song, idx) => {
      return (
        <div key={song.id} className={styles.track}>
          <Link href={song.external_urls.spotify} passHref target="_blank">
            <div className={styles.play}>
              <BsFillPlayCircleFill />
            </div>
          </Link>
          <div>
            <span>{song.name}</span>
            <span className={styles.ms}>
              {MsToMinsAndSeconds(song.duration_ms)}
            </span>
            <div className={styles.meta}>
              <p>{song.artists[0].name}</p>
            </div>
          </div>
        </div>
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
      <main className={styles.container}>
        <section className={styles.innerContainer}>
          <h4 className={styles.artistName}>{album.artists[0].name}</h4>
          <h2 className={styles.albumTitle}>{album.name}</h2>
          <section className={styles.imageSection}>
            <Link href={album.external_urls.spotify} passHref>
              <div className={styles.imageContainer}>
                <Image
                  className={styles.image}
                  src={album.images[0].url}
                  alt={album.name}
                  height={600}
                  width={600}
                />
              </div>
            </Link>
            <section className={styles.blurred}>
              <div className={styles.blurredImageContainer}>
                <div className={`${styles.gradient} ${styles.gradientTop}`} />
                <div
                  className={`${styles.gradient} ${styles.gradientBottom}`}
                />

                <Image
                  className={styles.blurredImage}
                  src={album.images[0].url}
                  alt={album.name}
                  height={640}
                  width={1024}
                />
              </div>
            </section>
          </section>
        </section>
        <section className={styles.innerContainer}>
          <h4 className={styles.trackList}>Tracklist:</h4>
          <>{renderTracks()}</>
          <span className={styles.copyright}>{album.copyrights[0].text}</span>
        </section>
      </main>
    </>
  );
};

export default Album;

export async function getServerSideProps({ params }) {
  const token = await GET_ACCESS_TOKEN();
  const album = await axios(`${ALBUM_ENDPOINT}${params.album}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.data);
  return {
    props: {
      album,
    },
  };
}
