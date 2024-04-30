import Backward from "./mediaControls/Backward"
import Forward from "./mediaControls/Forward"
import Pause from "./mediaControls/Pause"
import Play from "./mediaControls/Play"
import SeekBar from "./mediaControls/SeekBar";
import VolumeBar from "./mediaControls/VolumeBar";

type Handler = () => void;

const MediaControls = ({
  progress,
  volume,
  isPaused, 
  handleTogglePlay, 
  handleNext,
  handlePrevious,
  handleSeek,
  handleVolume
}: {
  progress: number, 
  volume: number, 
  isPaused: boolean, 
  handleTogglePlay:Handler, 
  handleNext:Handler, 
  handlePrevious:Handler, 
  handleSeek: (progress: number) => void, 
  handleVolume: (volume: number) => void
}
) => {
  
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        <Backward handleClick={handlePrevious}/>
        {isPaused
          ? <Play handleClick={handleTogglePlay}/>
          : <Pause handleClick={handleTogglePlay}/>
        }
        <Forward handleClick={handleNext}/>
      </div>
      <VolumeBar volume={volume} handleVolume={(volume) => handleVolume(volume)}/>
      <SeekBar progress={progress} handleSeek={(progress) => handleSeek(progress)}/>
    </div>
  )

}

export default MediaControls