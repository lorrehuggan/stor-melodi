import React from 'react';
import Link from 'next/link';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import styles from './styles.module.scss';

const PlaylistTracklist = ({ album, copyright }) => {
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
        <div key={song.track.id} className={styles.track}>
          <Link href={song.track.external_urls.spotify} passHref>
            <a className={styles.play} target="_blank">
              <BsFillPlayCircleFill />
            </a>
          </Link>
          <div>
            <span>{song.track.name}</span>
            <span className={styles.ms}>
              {MsToMinsAndSeconds(song.track.duration_ms)}
            </span>
            <div className={styles.meta}>
              <p>{song.track.artists[0].name}</p>
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

export default PlaylistTracklist;
