import axios from 'axios';
import React from 'react';
import HeadTag from '../../components/Head';
import {
  ALBUM_ENDPOINT,
  GET_ACCESS_TOKEN,
  ARTIST_ENDPOINT,
} from '../../lib/spotify';
import styles from './styles.module.scss';
import AlbumHeading from '../../components/Album/AlbumHeading';
import AlbumArt from '../../components/Album/AlbumArt';
import AlbumTracklist from '../../components/Album/AlbumTracklist';

const Album = ({ album, artist }) => {
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
            artist={artist}
            album={album}
            name={album.artists[0].name}
            title={album.name}
            href={artist.external_urls.spotify}
            src={artist.images[1].url}
            alt={artist.name}
          />
          <AlbumArt
            href={album.external_urls.spotify}
            src={album.images[0].url}
            alt={album.name}
          />
        </section>
        <section className={styles.innerContainer}>
          <AlbumTracklist album={album} copyright={album.copyrights[0].text} />
        </section>
      </section>
    </>
  );
};

export default Album;

export async function getServerSideProps({ params }) {
  const token = await GET_ACCESS_TOKEN();
  // Fetch albums
  const album = await axios(`${ALBUM_ENDPOINT}${params.album}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.data)
    .catch((error) => console.log(error));
  // Fetch artist with album data
  const artist = await axios(`${ARTIST_ENDPOINT}${await album.artists[0].id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.data)
    .catch((error) => console.log(error));
  return {
    props: {
      album,
      artist,
    },
  };
}
