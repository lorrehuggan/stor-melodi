import React, { useState } from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import { useAppStateValue } from '../../../context/AppProvider';
import { types } from '../../../reducers/appReducer';
import { MsToMinsAndSeconds } from '../../../utils/MsToMins';
import { Howler, Howl } from 'howler';
import { motion } from 'framer-motion';

const AlbumTracklist = ({ album, copyright, features }) => {
  const [{ playing, itemPlaying }, dispatch] = useAppStateValue();

  const renderTracks = () => {
    return album?.tracks.items.map((song, idx) => {
      const trackFeatures = features.filter((feature) => {
        return feature?.id === song?.id;
      });
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
        danceVariant: {
          hidden: {
            opacity: 0,
            width: 0,
          },
          visible: {
            opacity: 1,
            width: `${Math.floor(trackFeatures[0]?.danceability * 100)}%`,
            transition: {
              delay: 1.6,
              duration: 0.3,
              type: 'spring',
              stiffness: 90,
            },
          },
        },
        energyVariant: {
          hidden: {
            opacity: 0,
            width: 0,
          },
          visible: {
            opacity: 1,
            width: `${Math.floor(trackFeatures[0]?.energy * 100)}%`,
            transition: {
              delay: 1.8,
              duration: 0.3,
              type: 'spring',
              stiffness: 90,
            },
          },
        },
        acousticVariant: {
          hidden: {
            opacity: 0,
            width: 0,
          },
          visible: {
            opacity: 1,
            width: `${Math.floor(trackFeatures[0]?.acousticness * 100)}%`,
            transition: {
              delay: 2,
              duration: 0.3,
              type: 'spring',
              stiffness: 90,
            },
          },
        },
      };

      // Play dispatch function
      const player = new Howl({
        src: song?.preview_url,
        html5: true,
        volume: 0.3,
        onplay: () => {
          dispatch({
            type: types.SET_PLAYING,
            playing: true,
          });
          dispatch({
            type: types.SET_ITEM_PLAYING,
            itemPlaying: song,
          });
        },
        onend: () => {
          dispatch({
            type: types.SET_PLAYING,
            playing: false,
          });
          dispatch({
            type: types.SET_ITEM_PLAYING,
            itemPlaying: null,
          });
        },
      });

      const handlePlay = () => {
        if (song.preview_url) {
          player.play();
        } else {
          return;
        }
      };
      const handleStop = () => {
        Howler.stop();
        dispatch({
          type: types.SET_PLAYING,
          playing: false,
        });
        dispatch({
          type: types.SET_ITEM_PLAYING,
          itemPlaying: null,
        });
      };

      return (
        <motion.section
          variants={animations.trackVariant}
          initial="hidden"
          animate="visible"
          key={song?.id}
          className={styles.trackContainer}
        >
          <div className={styles.track}>
            {song?.id === itemPlaying?.id && song.preview_url ? (
              <div className={`${styles.numberCircle} ${styles.circlePlaying}`}>
                <div className={styles.number}>{idx + 1}</div>
              </div>
            ) : (
              <div className={styles.numberCircle}>
                <div className={styles.number}>{idx + 1}</div>
              </div>
            )}

            {/*song features*/}
            {/* danceability */}
            <div className={styles.featureContainer}>
              <motion.div
                variants={animations.danceVariant}
                initial="hidden"
                animate="visible"
                className={`${styles.danceBar} ${styles.bar}`}
                style={{
                  width: `${Math.floor(trackFeatures[0]?.danceability * 100)}%`,
                }}
              ></motion.div>
              {/* energy */}
              <motion.div
                variants={animations.energyVariant}
                initial="hidden"
                animate="visible"
                className={`${styles.energyBar} ${styles.bar}`}
                style={{
                  width: `${Math.floor(trackFeatures[0]?.energy * 100)}%`,
                }}
              ></motion.div>
              {/* acoustic */}
              <motion.div
                variants={animations.acousticVariant}
                initial="hidden"
                animate="visible"
                className={`${styles.acousticBar} ${styles.bar}`}
                style={{
                  width: `${Math.floor(trackFeatures[0]?.acousticness * 100)}%`,
                }}
              ></motion.div>
            </div>
            {/* Track Information */}
            <div>
              {song?.id === itemPlaying?.id && song?.preview_url ? (
                <Link href={song?.external_urls.spotify} passHref>
                  <span
                    className={styles.songName}
                    onMouseOver={handlePlay}
                    onMouseLeave={handleStop}
                  >
                    {song?.name}
                  </span>
                </Link>
              ) : (
                <Link href={song?.external_urls.spotify} passHref>
                  <span
                    className={styles.noPreview}
                    onMouseOver={handlePlay}
                    onMouseLeave={handleStop}
                  >
                    {song?.name}
                  </span>
                </Link>
              )}
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
        </motion.section>
      );
    });
  };

  return (
    <>
      <motion.div className={styles.container}>
        <div className={styles.featureIdx}>
          <div className={`${styles.pin} ${styles.dancePin}`}></div>
          <span>Dance-ability</span>
        </div>
        <div className={styles.featureIdx}>
          <div className={`${styles.pin} ${styles.energyPin}`}></div>
          <span>Energy</span>
        </div>
        <div className={styles.featureIdx}>
          <div className={`${styles.pin} ${styles.acousticPin}`}></div>
          <span>Acoustic-ness</span>
        </div>
      </motion.div>
      <motion.div>{renderTracks()}</motion.div>
      <span className={styles.copyright}>{copyright}</span>
    </>
  );
};

export default AlbumTracklist;
