import { useClipsContext } from "../context/clipContext";
import { BASE_URL } from "../utils/fetchFromAPI";
import { useEffect, useRef, useState } from "react";
import MediaControls from "./MediaControls";

const AudioPlayer = () => {
  const {queue, currentQueueIndex, setcurrentQueueIndex, setqueue} = useClipsContext();
  const audio = useRef<HTMLAudioElement>(null);
  const [isPaused, setisPaused] = useState(true);

  const nextClip = () => {
    if (audio.current === null) return;
    if (currentQueueIndex === queue.length-1) {
      setcurrentQueueIndex(0);
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

  // When shuffle button clicked
  useEffect(() => {
    audio.current && (audio.current.autoplay = true);
  }, [queue]);

  return (
    <div>
      <MediaControls 
        isPaused={isPaused}
        handleTogglePlay={togglePlay} 
        handleNext={nextClip} 
        handlePrevious={prevClip}
      />
      {queue[currentQueueIndex] && <audio 
        ref={audio}
        src={`${BASE_URL}/clips/audio/${queue[currentQueueIndex]._id}`} 
        //controls 
        autoPlay
        onPlay={() => setisPaused(false)}
        onPause={() => setisPaused(true)}
        onEnded={nextClip}
      /> } 
    </div>
  )
}

export default AudioPlayer