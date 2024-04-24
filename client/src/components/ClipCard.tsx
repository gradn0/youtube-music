import { useState } from 'react';
import { Clip } from './Collection'
import { HorizontallEllipsis } from './Icons';
import DropDown from './DropDown';
import EditText from './EditText';

const ClipCard = ({clip, handlePlay, handleUpdate, handleDelete}: {clip: Clip, handlePlay: () => void, handleUpdate: (title: string) => void, handleDelete: () => void}) => {
  const [showDropdown, setshowDropdown] = useState(false);
  const [editMode, seteditMode] = useState(false);
  
  const createdAt = clip.createdAt.split(':')[0].slice(0, 10);
  const msecs = clip.end - clip.start;
  let secs = Math.floor(msecs/1000);
  const mins = Math.floor(secs/60);
  if (secs > 59) {
    secs = 0;
  }

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
    <div className="flex text-white text-body p-2 border-veryLightGray border-b-[1px] cursor-pointer gap-5 relative">
      {!editMode && <p className="flex-1 text-nowrap overflow-x-hidden" onClick={handlePlay}>{clip.title}</p>}
      {editMode && <span className="flex-1 text-nowrap overflow-x-hidden"><EditText placeholderText={clip.title} handleSubmit={(title) => handleTextEdit(title)}/></span>}
      <span className="flex-1"><a className="text-faded text-small hover:opacity-85 " href={`https://www.youtube.com/watch?v=${clip.videoId}`}>Source</a></span>
      <p className="flex-1 text-faded text-small hidden lg:block">{createdAt}</p>
      <p className="flex-1 text-faded text-small">
        {mins > 9 ? mins : "0" + mins}:
        {secs > 9 ? secs : "0" + secs}
      </p>
      <span className="flex-1">
        <HorizontallEllipsis handleClick={() => setshowDropdown(true)}/>
        {showDropdown && 
        <span className="top-full left-full">
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