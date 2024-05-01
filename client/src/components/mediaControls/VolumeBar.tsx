import { useRef, useState } from "react";
import { Speaker, SpeakerMuted } from "../Icons";

const VolumeBar = ({volume, handleVolume}: {volume: number, handleVolume: (volume: number) => void}) => {
  const volRef = useRef<HTMLDivElement>(null);
  const [volActive, setvolActive] = useState(false);
  const [muted, setmuted] = useState(volume > 0 ? false : true);
  const [prevVolume, setprevVolume] = useState(volume);

  const setVolume = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!volRef.current) return;
    const width = volRef.current.clientWidth;
    const offset = volRef.current.offsetLeft;
    const vol = (e.pageX - offset)/width * 100;
    handleVolume(vol);
    vol === 0 ? setmuted(true) : setmuted(false);
  }

  const toggleMute = () => {
    if (muted) {
      handleVolume(prevVolume);
      setmuted(false);
    } else {
      setprevVolume(volume);
      setmuted(true);
      handleVolume(0);
    }
  }

  return (
    <div className="flex gap-2 items-center">
      {muted
        ? <SpeakerMuted handleClick={() => toggleMute()}/>
        : <Speaker handleClick={() => toggleMute()}/>
      }
      <div 
        onMouseEnter={() => setvolActive(true)} 
        onMouseLeave={() => setvolActive(false)} 
        onClick={(e) => setVolume(e)}
        className="bg-transparent flex items-center h-[1em] right-0"
      >
        <div ref={volRef} style={{height: volActive ? "0.3em" : "0.2em"}} className="w-[3em] md:w-[5em] h-[0.2em] bg-textGray rounded-full">
          <div style={{width: `${volume}%`, height: volActive ? "0.3em" : "0.2em"}} className={`bg-accent rounded-full`}/>
        </div>
      </div>
    </div>
    
  )
}

export default VolumeBar