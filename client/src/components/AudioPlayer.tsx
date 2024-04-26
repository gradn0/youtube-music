import { useClipsContext } from "../context/clipContext";
import { BASE_URL } from "../utils/fetchFromAPI";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
  const {queue, currentQueueIndex, setcurrentQueueIndex} = useClipsContext();
  const audio = useRef<HTMLAudioElement>(null);

  const nextClip = () => {
    if (audio.current === null) return;
    if (currentQueueIndex === queue.length-1) {
      setcurrentQueueIndex(0);
      audio.current.autoplay = false;
    } else {
      setcurrentQueueIndex(prev => prev + 1);
    }
  }

  // When shuffle button clicked
  useEffect(() => {audio.current && (audio.current.autoplay = true)}, [queue]);

  return (
    <div>
      {queue[currentQueueIndex] && <audio 
        ref={audio}
        src={`${BASE_URL}/clips/audio/${queue[currentQueueIndex]._id}`} 
        controls 
        autoPlay
        onEnded={nextClip}
      /> } 
    </div>
  )
}

export default AudioPlayer