import axios from 'axios';
import React, { useEffect, useState } from 'react';
import HeadTag from '../../components/Head';
import {
  ALBUM_ENDPOINT,
  GET_ACCESS_TOKEN,
  ARTIST_ENDPOINT,
  GET_TRACK_FEATURES_ENDPOINT,
  RECOMMENDATIONS_ENDPOINT,
  CHECK_ALBUM_SAVED_ENDPOINT,
} from '../../lib/spotify';
import styles from './styles.module.scss';
import AlbumHeading from '../../components/Album/AlbumHeading';
import AlbumArt from '../../components/Album/AlbumArt';
import AlbumTracklist from '../../components/Album/AlbumTracklist';
import SmallAlbumCard from '../../components/Album/SmallAlbumCard';
import { useAppStateValue } from '../../context/AppProvider';
import useScreenSize from '../../hooks/useScreenWidth';

const Album = ({ album, artist, features, recommendations }) => {
  const [{ userToken }, dispatch] = useAppStateValue();
  const [albumSaved, setAlbumSaved] = useState(false);
  const { smallScreen } = useScreenSize(810);

  let tags = [];
  album?.tracks.items.map((song) => {
    return tags.push(song.name);
  });

  const head = {
    title: `${album?.name} - ${album?.artists[0].name}`,
    description: `${album?.name} - ${album?.artists[0].name}`,
    tags: tags,
  };

  const renderRecommended = () => {
    return recommendations.tracks?.map((rec, idx) => {
      return (
        <SmallAlbumCard
          idx={idx}
          src={rec?.album.images[1]?.url}
          alt={rec?.name}
          key={rec?.id}
          title={rec?.album.name}
          name={rec?.album.artists[0].name}
          href={`/album/${rec?.album.id}`}
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
          <AlbumHeading
            artist={artist}
            album={album}
            name={album?.artists[0].name}
            title={album?.name}
            href={artist?.external_urls.spotify}
            src={artist?.images[0].url}
            alt={artist?.name}
          />
          <AlbumArt
            href={album?.external_urls.spotify}
            src={album?.images[0].url}
            alt={album?.name}
            albumSaved={albumSaved}
            setAlbumSaved={setAlbumSaved}
            user={userToken}
            albumId={album?.id}
          />
        </section>
        <section className={styles.innerContainer}>
          <AlbumTracklist
            album={album}
            copyright={album?.copyrights[0].text}
            type="Tracklist"
            features={features}
          />
        </section>
        <section className={styles.recommended}>
          {smallScreen ? (
            <h2>Recommended</h2>
          ) : (
            <h2>
              If you like <span>{album?.name}</span> you might like these:
            </h2>
          )}
          <div className={styles.grid}>{renderRecommended()}</div>
        </section>
      </section>
    </>
  );
};

export default Album;

export async function getServerSideProps({ params }) {
  let token = await GET_ACCESS_TOKEN();

  const getData = async (url) => {
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.data;
      return data;
    } catch (error) {
      console.log({ error: error.message });
    }
  };
  // Fetch albums
  const album = await getData(`${ALBUM_ENDPOINT}${params.album}`);
  // Fetch artist with album data
  const artist = await getData(
    `${ARTIST_ENDPOINT}${await album.artists[0].id}`
  );

  // ----->
  // get track features = dance ability, key, energy...
  const ids = album.tracks.items.map((m) => m.id);
  const featuresData = await getData(
    `${GET_TRACK_FEATURES_ENDPOINT}?ids=${ids.join(',')}`
  );
  const features = await featuresData.audio_features;
  //----->
  //get recommendations base on artist
  const recommendations = await getData(
    `${RECOMMENDATIONS_ENDPOINT}?seed_artists=${artist?.id}&limit=4`
  );

  return {
    props: {
      album,
      artist,
      features,
      recommendations,
    },
  };
}
