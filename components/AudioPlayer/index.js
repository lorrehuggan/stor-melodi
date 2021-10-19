import React, { useState, useRef } from 'react';
import styles from './styles.module.scss';
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from 'react-icons/bs';
import { types } from '../../reducers/appReducer';
import { useAppStateValue } from '../../context/AppProvider';

const AudioPlayer = ({ src }) => {
  const [{ playing }, dispatch] = useAppStateValue();
  const audioPlayer = useRef();

  const togglePlay = () => {
    dispatch({
      type: types.SET_PLAYING,
      playing: !playing,
    });
  };

  return (
    <div className={styles.audioPlayer}>
      <audio ref={audioPlayer} src={src}></audio>
      <button className={styles.button} onClick={togglePlay}>
        {playing ? <BsFillPauseCircleFill /> : <BsFillPlayCircleFill />}
      </button>
      {/* current Time */}
      <div className={styles.currentTime}>00:00</div>
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
