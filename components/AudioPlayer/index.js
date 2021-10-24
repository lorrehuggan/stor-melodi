import React, { useState, useRef } from 'react';
import styles from './styles.module.scss';
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from 'react-icons/bs';
import { types } from '../../reducers/appReducer';
import { useAppStateValue } from '../../context/AppProvider';
import { Howl, Howler } from 'howler';

const AudioPlayer = ({ src }) => {
  const [{ playing, itemPlaying }, dispatch] = useAppStateValue();

  const player = new Howl({
    src: src,
    html5: true,
    volume: 0.3,
    onplay: () => {
      dispatch({
        type: types.SET_PLAYING,
        playing: true,
      });
    },
    onend: () => {
      dispatch({
        type: types.SET_PLAYING,
        playing: false,
      });
    },
  });

  const togglePlay = () => {
    if (playing) {
      Howler.stop();
      dispatch({
        type: types.SET_PLAYING,
        playing: false,
      });
    } else {
      player.play();
    }
  };

  const songPlaying = playing ? styles.buttonPlaying : '';

  return (
    <div className={styles.audioPlayer}>
      <button
        className={`${styles.button} ${songPlaying}`}
        onClick={togglePlay}
      >
        {playing ? <BsFillPauseCircleFill /> : <BsFillPlayCircleFill />}
      </button>
      {/* current Time */}
      {/* <div className={styles.currentTime}>00:00</div> */}
      {/* progress bar */}
      {/* <div className={styles.rangeContainer}>
        <input type="range" className={styles.range} />
      </div> */}
      {/* duration */}
      {/* <div className={styles.duration}>00:30</div> */}
    </div>
  );
};

export default AudioPlayer;
