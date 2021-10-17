import React from 'react';
import Link from 'next/link';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import styles from './styles.module.scss';

const AlbumTracklist = ({ album, copyright }) => {
  function MsToMinsAndSeconds(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return seconds == 60
      ? minutes + 1 + ':00'
      : minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  const renderTracks = () => {
    return album?.tracks.items.map((song) => {
      return (
        <div key={song.id} className={styles.track}>
          <Link href={song.external_urls.spotify} passHref>
            <a className={styles.play} target="_blank">
              <BsFillPlayCircleFill />
            </a>
          </Link>
          <div>
            <span>{song.name}</span>
            <span className={styles.ms}>
              {MsToMinsAndSeconds(song.duration_ms)}
            </span>
            <div className={styles.meta}>
              {song.artists.map((artist) => {
                return (
                  <Link
                    key={artist.id}
                    href={artist.external_urls.spotify}
                    passHref
                  >
                    <a target="_blank">
                      <p key={artist.id}>{`${artist.name}${
                        song.artists.length > 1 ? ',' : ''
                      }`}</p>
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <h4 className={styles.trackList}>Tracklist:</h4>
      <>{renderTracks()}</>
      <span className={styles.copyright}>{copyright}</span>
    </>
  );
};

export default AlbumTracklist;
