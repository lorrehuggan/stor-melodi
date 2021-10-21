import styles from '../styles/styles.module.scss';
import HeadTag from '../components/Head';
import React from 'react';
import {
  NEW_RELEASES_ENDPOINT,
  GET_ACCESS_TOKEN,
  ARTIST_ENDPOINT,
  FEATURED_PLAYLIST_ENDPOINT,
} from '../lib/spotify';
import axios from 'axios';
import SmallAlbumCard from '../components/Album/SmallAlbumCard';
import FeaturedAlbum from '../components/Album/FeaturedAlbum';

export default function Home({
  newReleases,
  featured,
  playlists,
  featuredArtist1,
}) {
  console.log(newReleases);
  //------>
  //set meta tags
  let tags = [];
  newReleases.map((release) => {
    return tags.push(release.name);
  });
  newReleases.map((release) => {
    return tags.push(release.artists[0].name);
  });
  const head = {
    title: 'Chune',
    description: 'The Music Discovery App To Find The Best CHUNES!',
    tags: tags,
  };

  const featuredItem = 0;
  const featuredItem2 = 2;

  const renderNewReleases = () => {
    return newReleases?.map((release) => {
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
  const renderPlaylists = () => {
    return playlists?.map((playlist) => {
      return (
        <SmallAlbumCard
          src={playlist.images[0].url}
          alt={playlist.name}
          key={playlist.id}
          title={playlist.name}
          name={playlist.description}
          href={`/playlist/${playlist.id}`}
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
          {/* Featured Album */}
          <FeaturedAlbum
            layout
            image={newReleases[featuredItem].images[0].url}
            artist={newReleases[featuredItem]?.artists[0].name}
            followers={featured?.followers.total}
            albumType={newReleases[featuredItem]?.album_type}
            title={newReleases[featuredItem]?.name}
            href={newReleases[featuredItem]?.external_urls.spotify}
          />
          {/* New Releases */}
          <section className={styles.newReleases}>
            <h2>New Releases</h2>
            <div className={styles.grid}>{renderNewReleases()}</div>
          </section>
          {/* Featured Playlist */}
          <section className={styles.newReleases}>
            <h2>Featured Playlist</h2>
            <div className={styles.grid}>{renderPlaylists()}</div>
          </section>
          {/* Featured Album */}
          <FeaturedAlbum
            image={newReleases[featuredItem2].images[0].url}
            artist={newReleases[featuredItem2]?.artists[0].name}
            followers={featuredArtist1?.followers.total}
            albumType={newReleases[featuredItem2]?.album_type}
            title={newReleases[featuredItem2]?.name}
            href={newReleases[featuredItem2]?.external_urls.spotify}
          />
          <section className={styles.newReleases}>
            <h2>Featured Playlist</h2>
            <div className={styles.grid}>{renderPlaylists()}</div>
          </section>
        </section>
      </section>
    </>
  );
}

export async function getStaticProps() {
  let token = await GET_ACCESS_TOKEN();
  //------>
  // get top 4 new releases
  let newReleases = await axios(`${NEW_RELEASES_ENDPOINT}?limit=4`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.data.albums.items)
    .catch((error) => console.log(error));
  //------>
  //get featured artist
  let featured = await axios(
    `${ARTIST_ENDPOINT}${newReleases[0].artists[0].id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((res) => res.data)
    .catch((error) => console.log(error));
  //------>
  //get featured 1 artist
  let featuredArtist1 = await axios(
    `${ARTIST_ENDPOINT}${newReleases[2].artists[0].id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((res) => res.data)
    .catch((error) => console.log(error));
  //------>
  //get featured playlist
  let playlists = await axios(`${FEATURED_PLAYLIST_ENDPOINT}&limit=4`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.data.playlists.items)
    .catch((error) => console.log(error));

  return {
    props: { newReleases, featured, playlists, featuredArtist1 },
  };
}
