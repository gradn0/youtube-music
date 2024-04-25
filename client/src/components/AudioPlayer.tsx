import ReactAudioPlayer from "react-audio-player";

const AudioPlayer = () => {
  return (
    <div>
      <ReactAudioPlayer 
        src="http://localhost:3000/api/clips/audio/662a5d00fea3695457939853"
        controls
      />
    </div>
  )
}

export default AudioPlayer