import React from 'react';
import axios from 'axios';
import {
  GET_ACCESS_TOKEN,
  PLAYLIST_ENDPOINT,
  GET_TRACK_FEATURES_ENDPOINT,
} from '../../lib/spotify';
import HeadTag from '../../components/Head';
import styles from './styles.module.scss';
import AlbumHeading from '../../components/Album/AlbumHeading';
import AlbumArt from '../../components/Album/AlbumArt';
import PlaylistTracklist from '../../components/Album/PlaylistTracklist';

const Playlist = ({ playlist, features }) => {
  let tags = [];
  playlist.tracks.items.map((track) => {
    return tags.push(track.track.name);
  });
  const head = {
    title: playlist.name,
    description: playlist.description,
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
            artist={playlist}
            album={playlist}
            name={playlist.description}
            title={playlist.name}
            href={playlist.external_urls.spotify}
            src={playlist.images[0].url}
            alt={playlist.name}
          />
          <AlbumArt
            href={playlist.external_urls.spotify}
            src={playlist.images[0].url}
            alt={playlist.name}
          />
          <section className={styles.innerContainer}>
            <PlaylistTracklist
              album={playlist}
              copyright={playlist.description}
              type="Playlist"
              features={features}
            />
          </section>
        </section>
      </section>
    </>
  );
};

export default Playlist;

export async function getServerSideProps({ params }) {
  const token = await GET_ACCESS_TOKEN();
  // Fetch albums
  const playlist = await axios(`${PLAYLIST_ENDPOINT}${params.playlist}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.data)
    .catch((error) => console.log(error));

  // get track features = dance ability, key, energy...
  const ids = playlist.tracks.items.map((m) => m.track.id);
  const features = await axios(
    `${GET_TRACK_FEATURES_ENDPOINT}?ids=${ids.join(',')}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((res) => res.data.audio_features)
    .catch((error) => console.log(error));

  return {
    props: {
      playlist,
      features,
    },
  };
}
