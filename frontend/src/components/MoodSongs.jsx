import { useState, useRef } from "react";
import "./MoodSongs.css";

const MoodSongs = ({ Songs }) => {
  const [isPlaying, setIsPlaying] = useState(null);
  const audioRefs = useRef([]); // Sab audio elements ka reference store hoga

  const handlePlayPause = (index) => {
    if (isPlaying === index) {
      // Pause current song
      audioRefs.current[index].pause();
      setIsPlaying(null);
    } else {
      // Agar koi dusra song chal raha hai to usko stop karo
      if (isPlaying !== null) {
        audioRefs.current[isPlaying].pause();
        audioRefs.current[isPlaying].currentTime = 0;
      }

      // Play selected song
      audioRefs.current[index]
        .play()
        .then(() => setIsPlaying(index))
        .catch((err) => console.error("Playback failed:", err));
    }
  };

  return (
    <div className="mood-songs">
      <h2>Recommended Songs</h2>

      {Songs.map((song, index) => (
        <div className="songs" key={index}>
          <div className="title">
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
          </div>
          <div className="play-pause-button">
            <audio
              ref={(el) => (audioRefs.current[index] = el)}
              src={song.audio}
            />
            <button onClick={() => handlePlayPause(index)}>
              {isPlaying === index ? (
                <i className="ri-pause-line"></i>
              ) : (
                <i className="ri-play-circle-fill"></i>
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MoodSongs;
