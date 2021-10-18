import React, { useState } from 'react';
import Link from 'next/link';
import { BsFillPlayCircleFill, BsSpotify } from 'react-icons/bs';
import styles from './styles.module.scss';

const AlbumTracklist = ({ album, copyright }) => {
  const [selected, setSelected] = useState('');
  function MsToMinsAndSeconds(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return seconds == 60
      ? minutes + 1 + ':00'
      : minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  const renderTracks = () => {
    return album?.tracks.items.map((song, idx) => {
      return (
        <>
          <div key={song.id} className={styles.track}>
            {/* spotify / play button */}
            <a
              onClick={() =>
                selected ? setSelected('') : setSelected(song.id)
              }
              className={styles.play}
            >
              {selected === song.id ? <BsSpotify /> : <BsFillPlayCircleFill />}
            </a>
            {/* song details */}
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
          {/* audio player */}
          {song.id === selected ? (
            <div className={styles.player}>{song.name}</div>
          ) : (
            ''
          )}
        </>
      );
    });
  };

  return (
    <>
      <h4 className={styles.trackList}>Track List:</h4>
      <>{renderTracks()}</>
      <span className={styles.copyright}>{copyright}</span>
    </>
  );
};

export default AlbumTracklist;
