import ReactAudioPlayer from "react-audio-player";
import { useClipsContext } from "../context/clipContext";
import { BASE_URL } from "../utils/fetchFromAPI";

const AudioPlayer = () => {
  const {active} = useClipsContext();
  return (
    <div>
      {active && <ReactAudioPlayer
        src={`${BASE_URL}/clips/audio/${active?._id}`}
        controls
        autoPlay={true}
      />}
    </div>
  )
}

export default AudioPlayer