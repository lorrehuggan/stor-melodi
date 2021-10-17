import React, { useState, useRef } from 'react';
import styles from './styles.module.scss';
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from 'react-icons/bs';

const AudioPlayer = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioPlayer = useRef();

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
  };

  return (
    <div className={styles.audioPlayer}>
      <audio ref={audioPlayer} src={src}></audio>
      <button className={styles.button} onClick={togglePlay}>
        {isPlaying ? <BsFillPauseCircleFill /> : <BsFillPlayCircleFill />}
      </button>
      {/* current Time */}
      <div className={styles.currentTime}>00:00</div>
      {/* progress bar */}
      <div className={styles.rangeContainer}>
        <input type="range" className={styles.range} />
      </div>
      {/* duration */}
      <div className={styles.duration}>00:30</div>
    </div>
  );
};

export default AudioPlayer;
