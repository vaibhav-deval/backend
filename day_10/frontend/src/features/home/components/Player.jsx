import React, { useRef, useState, useEffect } from "react";
import { useSong } from "../hooks/useSong.js";
import "../style/Player.scss";

const Player = () => {
  const { song } = useSong();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.playbackRate = speed;
    }
  }, [speed]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime);
      const updateDuration = () => setDuration(audio.duration);
      const handleEnded = () => setIsPlaying(false);

      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("loadedmetadata", updateDuration);
      audio.addEventListener("ended", handleEnded);

      return () => {
        audio.removeEventListener("timeupdate", updateTime);
        audio.removeEventListener("loadedmetadata", updateDuration);
        audio.removeEventListener("ended", handleEnded);
      };
    }
  }, [song]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const forward5 = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = Math.min(audio.currentTime + 5, duration);
    }
  };

  const backward5 = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = Math.max(audio.currentTime - 5, 0);
    }
  };

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    if (audio) {
      const newTime = (e.target.value / 100) * duration;
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  if (!song || !song.url) {
    return <div>No song selected</div>;
  }

  return (
    <div className="player">
      <audio ref={audioRef} src={song.url} preload="metadata" />
      <div className="player-info">
        <h3>{song.title}</h3>
        <img
          src={song.posterUrl}
          alt={song.title}
        />
      </div>
      <div className="player-controls">
        <button onClick={backward5}>⏪ -5s</button>
        <button onClick={togglePlayPause}>{isPlaying ? "⏸️" : "▶️"}</button>
        <button onClick={forward5}>+5s ⏩</button>
      </div>
      <div className="player-progress">
        <span>{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max="100"
          value={duration ? (currentTime / duration) * 100 : 0}
          onChange={handleProgressChange}
        />
        <span>{formatTime(duration)}</span>
      </div>
      <div className="player-speed">
        <label>Speed: </label>
        <select
          value={speed}
          onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
        >
          <option value={0.5}>0.5x</option>
          <option value={1}>1x</option>
          <option value={1.5}>1.5x</option>
          <option value={2}>2x</option>
        </select>
      </div>
      <div className="player-volume">
        <span>🔊</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};

export default Player;
