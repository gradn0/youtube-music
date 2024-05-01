import { useRef, useState } from "react";

const SeekBar = ({progress, handleSeek}: {progress: number, handleSeek: (progress: number) => void}) => {
  const seekRef = useRef<HTMLDivElement>(null);
  const [seekActive, setseekActive] = useState(false);

  const onSeek = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!seekRef.current) return;
    const width = seekRef.current.clientWidth;
    const offset = seekRef.current.offsetLeft;
    handleSeek((e.pageX - offset)/width * 100);
  } 
  return (
    <div 
        onMouseEnter={() => setseekActive(true)} 
        onMouseLeave={() => setseekActive(false)} 
        onClick={(e) => onSeek(e)}
        className="bg-transparent flex items-center h-[1em]"
      >
        <div ref={seekRef} style={{height: seekActive ? "0.3em" : "0.2em"}} className="w-[90vw] xxs:w-[20em] sm:w-[25em] md:w-[30em] h-[0.2em] bg-textGray rounded-full">
          <div style={{width: `${progress}%`, height: seekActive ? "0.3em" : "0.2em"}} className={`bg-accent rounded-full`}/>
        </div>
      </div>
  )
}

export default SeekBar