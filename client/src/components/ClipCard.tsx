import { useState } from 'react';
import { Clip } from './Collection'
import { HorizontallEllipsis } from './Icons';
import DropDown from './DropDown';
import EditText from './EditText';
import { useClipsContext } from '../context/clipContext';

const ClipCard = ({clip, handlePlay, handleUpdate, handleDelete}: {clip: Clip, handlePlay: () => void, handleUpdate: (title: string) => void, handleDelete: () => void}) => {
  const [showDropdown, setshowDropdown] = useState(false);
  const [editMode, seteditMode] = useState(false);
  const {queue, currentQueueIndex} = useClipsContext();
  
  const createdAt = clip.createdAt.split(':')[0].slice(0, 10);
  const msecs = clip.end - clip.start;
  let secs = Math.floor(msecs/1000) % 60;
  const mins = Math.floor(msecs / 1000 / 60);

  const handleOption = (i: number) => {
    setshowDropdown(false);
    switch(i) {
      case 0: {
        seteditMode(true);
        break;
      }
      case 1: {
        handleDelete();
        break;
      }
    }
  }

  const handleTextEdit = (title: string) => {
    handleUpdate(title);
    seteditMode(false);
  }

  return (
    <div className="flex text-white text-body p-2 border-veryLightGray border-b-[1px] cursor-pointer gap-5 relative items-center">
      <img src={clip.thumbnail} alt="Clip thumbnail" width="50"/>
      {!editMode && 
        <p style={{color: queue[currentQueueIndex]?.title === clip.title ? "#af67cb" : "white"}} 
        className="flex-1 text-nowrap text-small lg:text-body overflow-x-hidden" 
        onClick={handlePlay}>{clip.title}
        </p>}
      {editMode && <span className="flex-1 text-nowrap text-small overflow-x-hidden"><EditText placeholderText={clip.title} handleSubmit={(title) => handleTextEdit(title)}/></span>}
      <span className="flex-1"><a className="text-faded text-small hover:opacity-85 " href={`https://www.youtube.com/watch?v=${clip.videoId}`}>Source</a></span>
      <p className="flex-1 text-faded text-small hidden lg:block">{createdAt}</p>
      <p className="flex-1 text-faded text-small pt-[0.2em]">
        {mins > 9 ? mins : "0" + mins}:
        {secs > 9 ? secs : "0" + secs}
      </p>
      <span className="pt-[0.2em] flex-1 relative">
        <HorizontallEllipsis handleClick={() => setshowDropdown(prev => !prev)}/>
        {showDropdown && 
        <span className="absolute right-[11em] top-full sm:static">
          <DropDown 
            options={["Edit", "Delete"]} 
            handleClick={(i) => handleOption(i)} 
            handleMouseLeave={() => setshowDropdown(false)} 
          />
        </span>}
      </span>

    </div>
  )
}

export default ClipCard