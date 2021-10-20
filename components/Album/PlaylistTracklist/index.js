import React from 'react';
import Link from 'next/link';
import { BsFillPlayCircleFill, BsSpotify } from 'react-icons/bs';
import styles from './styles.module.scss';
import { MsToMinsAndSeconds } from '../../../utils/MsToMins';
import { useAppStateValue } from '../../../context/AppProvider';
import { types } from '../../../reducers/appReducer';
import AudioPlayer from '../../AudioPlayer';
import { Howler } from 'howler';
import { AUDIO_FEATURES_ENDPOINT } from '../../../lib/spotify';

const PlaylistTracklist = ({ album, copyright, type }) => {
  const [{ itemPlaying }, dispatch] = useAppStateValue();

  const renderTracks = () => {
    return album?.tracks.items.map((song) => {
      // Play button dispatch function
      const handlePlay = () => {
        console.log(itemPlaying);
        if (itemPlaying) {
          Howler.stop();
          dispatch({
            type: types.SET_ITEM_PLAYING,
            itemPlaying: null,
          });
          dispatch({
            type: types.SET_PLAYING,
            playing: false,
          });
        } else if (itemPlaying === null) {
          dispatch({
            type: types.SET_ITEM_PLAYING,
            itemPlaying: song.track,
          });
          // dispatch({
          //   type: types.SET_PLAYING,
          //   playing: true,
          // });
        } else {
          return;
        }
      };
      return (
        <>
          <div key={song.track.id} className={styles.track}>
            {/* spotify / play button*/}
            {itemPlaying?.id === song.track.id ? (
              <span
                className={styles.play}
                style={{ color: '#1ed760' }}
                onClick={handlePlay}
              >
                <BsSpotify />
              </span>
            ) : (
              <span className={styles.play} onClick={handlePlay}>
                <BsFillPlayCircleFill />
              </span>
            )}
            {/* song details */}

            <div>
              <span>{song.track.name}</span>
              <span className={styles.ms}>
                {MsToMinsAndSeconds(song.track.duration_ms)}
              </span>
              <div className={styles.meta}>
                {song.track.artists.map((artist) => {
                  return (
                    <Link
                      key={artist.id}
                      href={artist.external_urls.spotify}
                      passHref
                    >
                      <a target="_blank">
                        <p key={artist.id}>{`${artist.name}${
                          song.track.artists.length > 1 ? ',' : ''
                        }
                      `}</p>
                      </a>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          {/* audio player */}
          {song?.track.id === itemPlaying?.id ? (
            <>
              {song?.track.preview_url ? (
                <div className={styles.player}>
                  <AudioPlayer src={song?.track.preview_url} />
                </div>
              ) : (
                <div className={styles.player}>
                  <p>No Preview Track Available</p>
                </div>
              )}
              <span className={styles.playerLink}>
                {`Play ${itemPlaying.artists[0].name} - ${itemPlaying.name} Full Song On `}
                <Link href={song.track.external_urls.spotify} passHref>
                  <span>Spotify</span>
                </Link>
              </span>
            </>
          ) : (
            ''
          )}
        </>
      );
    });
  };

  return (
    <>
      <h4 className={styles.trackList}>{type}:</h4>
      <>{renderTracks()}</>
      <span className={styles.copyright}>{copyright}</span>
    </>
  );
};

export default PlaylistTracklist;
