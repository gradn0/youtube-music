import { Clip } from "./Collection";
import Backward from "./mediaControls/Backward"
import Forward from "./mediaControls/Forward"
import Pause from "./mediaControls/Pause"
import Play from "./mediaControls/Play"
import SeekBar from "./mediaControls/SeekBar";
import VolumeBar from "./mediaControls/VolumeBar";

type Handler = () => void;

const MediaControls = ({
  currentClip,
  progress,
  volume,
  isPaused, 
  handleTogglePlay, 
  handleNext,
  handlePrevious,
  handleSeek,
  handleVolume
}: {
  currentClip: Clip,
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
      <div className="flex items-center justify-between w-[90vw] xxs:w-[20em] md:w-[30em]">
        <p className="text-body text-textGray flex-1">{currentClip?.title}</p>
        <div className="flex items-center gap-4 flex-1">
          <Backward handleClick={handlePrevious}/>
          {isPaused
            ? <Play handleClick={handleTogglePlay}/>
            : <Pause handleClick={handleTogglePlay}/>
          }
          <Forward handleClick={handleNext}/>
        </div>
        <span className="flex-1 flex justify-end"><VolumeBar volume={volume} handleVolume={(volume) => handleVolume(volume)}/></span>
      </div>
      
      <SeekBar progress={progress} handleSeek={(progress) => handleSeek(progress)}/>
    </div>
  )

}

export default MediaControls