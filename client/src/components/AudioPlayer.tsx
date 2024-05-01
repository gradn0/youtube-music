import { useClipsContext } from "../context/clipContext";
import { BASE_URL } from "../utils/fetchFromAPI";
import { useEffect, useRef, useState } from "react";
import MediaControls from "./MediaControls";

const AudioPlayer = () => {
  const {queue, currentQueueIndex, setcurrentQueueIndex, setqueue} = useClipsContext();
  const audio = useRef<HTMLAudioElement>(null);
  const [isPaused, setisPaused] = useState(true);
  const [progress, setprogress] = useState(0);
  const [volume, setvolume] = useState(90);

  const nextClip = () => {
    if (audio.current === null) return;
    if (currentQueueIndex === queue.length-1) {
      setcurrentQueueIndex(0);
      setprogress(0);
      setqueue([]);
      audio.current.autoplay = false;
      setisPaused(true);
    } else {
      setcurrentQueueIndex(prev => prev + 1);
    }
  }

  const prevClip = () => {
    if (audio.current === null) return;
    if (currentQueueIndex === 0) {
      audio.current.currentTime = 0;
    } else {
      setcurrentQueueIndex(prev => prev - 1);
    }
  }

  const togglePlay = () => {
    if (isPaused) {
      audio.current?.play();
    } else {
      audio.current?.pause();
    }
  }

  const seek = (progress: number) => {
    if (!audio.current) return;
    audio.current.currentTime = (progress / 100) * audio.current.duration;
  }

  const changeVolume = (volume: number) => {
    if (!audio.current) return;
    audio.current.volume = (volume/100);
    setvolume(volume);
  }
  
  // When shuffle button clicked
  useEffect(() => {
    if (!audio.current) return;
    setcurrentQueueIndex(0);
    audio.current.currentTime = 0;
    audio.current.autoplay = true;
  }, [queue]);

  return (
    <div>
      <MediaControls 
        currentClip={queue[currentQueueIndex]}
        progress={progress}
        volume={volume}
        isPaused={isPaused}
        handleTogglePlay={togglePlay} 
        handleNext={nextClip} 
        handlePrevious={prevClip}
        handleSeek={(progress) => seek(progress)}
        handleVolume={(volume) => changeVolume(volume)}
      />
      
      {queue[currentQueueIndex] && <audio 
        ref={audio}
        src={`${BASE_URL}/clips/audio/${queue[currentQueueIndex]._id}`}  
        autoPlay
        onPlay={() => setisPaused(false)}
        onPause={() => setisPaused(true)}
        onEnded={nextClip}
        onTimeUpdate={() => audio.current && (setprogress(Math.floor(audio.current?.currentTime / audio.current?.duration * 100)))}
      /> } 
    </div>
  )
}

export default AudioPlayer