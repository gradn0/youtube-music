import { useRef, useState } from "react";

const VolumeBar = ({volume, handleVolume}: {volume: number, handleVolume: (volume: number) => void}) => {
  const volRef = useRef<HTMLDivElement>(null);
  const [volActive, setvolActive] = useState(false);

  const setVolume = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!volRef.current) return;
    const width = volRef.current.clientWidth;
    const offset = volRef.current.offsetLeft;
    handleVolume((e.pageX - offset)/width * 100);
  }
  return (
    <div 
        onMouseEnter={() => setvolActive(true)} 
        onMouseLeave={() => setvolActive(false)} 
        onClick={(e) => setVolume(e)}
        className="bg-transparent flex items-center h-[1em] right-0"
      >
        <div ref={volRef} style={{height: volActive ? "0.3em" : "0.2em"}} className="w-[5em] h-[0.2em] bg-textGray rounded-full">
          <div style={{width: `${volume}%`, height: volActive ? "0.3em" : "0.2em"}} className={`bg-accent rounded-full`}/>
        </div>
      </div>
  )
}

export default VolumeBar