import React from 'react';
import Link from 'next/link';
import { BsFillPlayCircleFill, BsSpotify } from 'react-icons/bs';
import { GiAudioCassette } from 'react-icons/gi';
import { RiPlayListAddLine } from 'react-icons/ri';
import styles from './styles.module.scss';
import AudioPlayer from '../../AudioPlayer';
import { useAppStateValue } from '../../../context/AppProvider';
import { types } from '../../../reducers/appReducer';
import { MsToMinsAndSeconds } from '../../../utils/MsToMins';
import { Howler } from 'howler';
import { motion } from 'framer-motion';

const AlbumTracklist = ({ album, copyright, features }) => {
  console.log(features);
  const [{ itemPlaying }, dispatch] = useAppStateValue();

  const renderTracks = () => {
    return album?.tracks.items.map((song, idx) => {
      const animations = {
        trackVariant: {
          hidden: {
            opacity: 0,
          },
          visible: {
            opacity: 1,
            transition: {
              delay: idx * 0.2,
              duration: 0.2,
              ease: 'easeOut',
            },
          },
        },
      };

      // Play button dispatch function
      const handlePlay = () => {
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
        } else if (!itemPlaying) {
          dispatch({
            type: types.SET_ITEM_PLAYING,
            itemPlaying: song,
          });
        } else {
          return;
        }
      };

      const trackFeatures = features.filter((feature) => {
        return feature.id === song.id;
      });

      return (
        <motion.section
          variants={animations.trackVariant}
          initial="hidden"
          animate="visible"
          key={song?.id}
          className={styles.trackContainer}
        >
          <div className={styles.track}>
            {/* spotify / play button*/}
            {itemPlaying?.id === song.id ? (
              <span
                className={styles.play}
                style={{ color: '#1ed760' }}
                onClick={handlePlay}
              >
                <GiAudioCassette />
              </span>
            ) : (
              <>
                <span className={styles.play} onClick={handlePlay}>
                  <BsFillPlayCircleFill />
                </span>
              </>
            )}
            {/*features*/}
            {/* danceability */}
            <div className={styles.featureContainer}>
              <div
                className={styles.danceBar}
                style={{
                  width: `${Math.floor(trackFeatures[0].danceability * 100)}%`,
                }}
              ></div>
              {/* energy */}
              <div
                className={styles.energyBar}
                style={{
                  width: `${Math.floor(trackFeatures[0].energy * 100)}%`,
                }}
              ></div>
              {/* acoustic */}
              <div
                className={styles.acousticBar}
                style={{
                  width: `${Math.floor(trackFeatures[0].acousticness * 100)}%`,
                }}
              ></div>
            </div>

            <div>
              <span>{song?.name}</span>
              <span className={styles.ms}>
                {MsToMinsAndSeconds(song?.duration_ms)}
              </span>
              <div className={styles.meta}>
                {song?.artists.map((artist) => {
                  return (
                    <Link
                      key={artist?.id}
                      href={artist?.external_urls.spotify}
                      passHref
                    >
                      <a target="_blank">
                        <p key={artist?.id}>{`${artist?.name}${
                          song?.artists.length > 1 ? ',' : ''
                        }`}</p>
                      </a>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          {/* audio player */}
          {song?.id === itemPlaying?.id ? (
            <div className={styles.trackPlayer}>
              {song?.preview_url ? (
                <div className={styles.player}>
                  <AudioPlayer src={song.preview_url} />
                </div>
              ) : (
                <div className={styles.player}>
                  <p>No Preview Track Available</p>
                </div>
              )}
              <span className={styles.playerLink}>
                {`Play Full Song On `}
                <Link href={song.external_urls.spotify} passHref>
                  <span>Spotify</span>
                </Link>
              </span>
            </div>
          ) : (
            ''
          )}
        </motion.section>
      );
    });
  };

  return (
    <>
      <h4 className={styles.trackList}>Track List:</h4>
      <motion.div>{renderTracks()}</motion.div>
      <span className={styles.copyright}>{copyright}</span>
    </>
  );
};

export default AlbumTracklist;
