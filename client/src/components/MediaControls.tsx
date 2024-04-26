import Backward from "./MediaButtons.tsx/Backward"
import Forward from "./MediaButtons.tsx/Forward"
import Pause from "./MediaButtons.tsx/Pause"
import Play from "./MediaButtons.tsx/Play"

type Handler = () => void;

const MediaControls = ({
  isPaused, 
  handleTogglePlay, 
  handleNext,
  handlePrevious
}: {isPaused: boolean, handleTogglePlay:Handler, handleNext:Handler, handlePrevious:Handler}
) => {
  return (
    <div className="flex items-center gap-4">
      <Backward handleClick={handlePrevious}/>
      {isPaused
        ? <Play handleClick={handleTogglePlay}/>
        : <Pause handleClick={handleTogglePlay}/>
      }
      <Forward handleClick={handleNext}/>
    </div>
  )

}

export default MediaControls