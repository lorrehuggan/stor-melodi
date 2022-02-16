import React from 'react';
import styles from './styles.module.scss';
import { useAppStateValue } from '../../context/AppProvider';
import Link from 'next/link';
import Image from 'next/image';
import SmallAlbumCard from '../../components/Album/SmallAlbumCard';

const User = () => {
  // Get users data
  const [{ user, userPlaylists, userTopTracks, userTopArtist }, dispatch] =
    useAppStateValue();
  console.log(userPlaylists);

  const renderUserTopTracks = () => {
    return userTopTracks?.slice(0, 4).map((top, idx) => {
      return (
        <SmallAlbumCard
          idx={idx}
          src={top?.album.images[1]?.url}
          alt={top?.name}
          key={top?.id}
          title={top?.name}
          name={top?.album.artists[0].name}
          href={`/album/${top?.album.id}`}
        />
      );
    });
  };
  const renderUserTopTracks2 = () => {
    return userTopTracks?.slice(4, 8).map((top, idx) => {
      return (
        <SmallAlbumCard
          idx={idx}
          src={top?.album.images[1]?.url}
          alt={top?.name}
          key={top?.id}
          title={top?.name}
          name={top?.album.artists[0].name}
          href={`/album/${top?.album.id}`}
        />
      );
    });
  };
  const renderUserTopPlaylists = () => {
    return userPlaylists?.slice(0, 4).map((top, idx) => {
      return (
        <SmallAlbumCard
          idx={idx}
          src={top?.images[0]?.url}
          alt={top?.name}
          key={top?.id}
          title={top?.name}
          name={top?.description}
          href={`/playlist/${top?.id}`}
        />
      );
    });
  };
  const renderUserTopPlaylists2 = () => {
    return userPlaylists?.slice(4, 8).map((top, idx) => {
      return (
        <SmallAlbumCard
          idx={idx}
          src={top?.images[0]?.url}
          alt={top?.name}
          key={top?.id}
          title={top?.name}
          name={top?.description}
          href={`/playlist/${top?.id}`}
        />
      );
    });
  };
  const renderUserTopArtist = () => {
    return userTopArtist?.slice(0, 6).map((top, idx) => {
      return (
        <div key={idx} className={styles.topArtist}>
          <div className={styles.topArtistImage}>
            <Link href={top?.external_urls.spotify} passHref>
              <a target="_blank" className={`${styles.avatar}`}>
                <Image
                  src={top?.images[1].url}
                  alt="artist-image"
                  layout="fill"
                  objectFit="cover"
                />
              </a>
            </Link>
          </div>
          <div className={styles.topArtistName}>{top?.name}</div>
        </div>
      );
    });
  };

  return (
    <section className={styles.container}>
      {!user ? (
        <section className={styles.innerContainer}>User not logged in</section>
      ) : (
        <section className={styles.innerContainer}>
          <div className={styles.userContainer}>
            {/*user information*/}
            {user?.images ? (
              <Link href={user?.external_urls.spotify} passHref>
                <a target="_blank" className={`${styles.avatar}`}>
                  <Image
                    src={user?.images[0].url}
                    alt="user-image"
                    layout="fill"
                    objectFit="cover"
                  />
                </a>
              </Link>
            ) : (
              ''
            )}
            <h2 className={styles.userName}>{user?.display_name}</h2>
            <span className={styles.product}>{user?.product}</span>
          </div>
          {/*user top artist*/}
          <div className={styles.topArtistHeading}>
            <h2>My All Time Top Artist</h2>
          </div>
          <div className={styles.topArtistContainer}>
            {renderUserTopArtist()}
          </div>

          {/*user top tracks*/}
          <section className={styles.innerContainer}>
            <section className={styles.albums}>
              <h2>My Recent Top Tracks</h2>
              <div className={styles.grid}>{renderUserTopTracks()}</div>
              <div className={styles.grid}>{renderUserTopTracks2()}</div>
            </section>
          </section>
          {/*user top playlists*/}
          <section className={styles.innerContainer}>
            <section className={styles.albums}>
              <h2>My Top Playlists</h2>
              <div className={styles.grid}>{renderUserTopPlaylists()}</div>
              <div className={styles.grid}>{renderUserTopPlaylists2()}</div>
            </section>
          </section>
        </section>
      )}
    </section>
  );
};

export default User;
