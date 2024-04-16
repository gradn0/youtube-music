import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ClipCard from "./ClipCard";
import ReactAudioPlayer from "react-audio-player";

export interface Clip {
  _id: any,
  title: String,
  playlist: String,
  videoId: String,
  start: number,
  end: number,
  createdAt: String
}

const Collection = () => {
  const { collectionTitle } = useParams();
  const [clips, setclips] = useState<Clip[]>([])
  const [activeClipId, setactiveClipId] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/clips/byPlaylist/${collectionTitle}`)
    .then(res => res.json())
    .then(json => setclips(json))
  }, [])

  return (
    <div>
      <h2 className="text-heading pb-10">{collectionTitle}</h2>
      <div className="flex flex-col">

        <div className="flex text-white opacity-55 text-small p-2 border-veryLightGray border-b-[1px] cursor-pointer gap-5">
          <p className="flex-1 text-nowrap overflow-x-hidden">Title</p>
          <span className="flex-1"/>
          <p className="flex-1 hidden lg:block">Date Added</p>
          <span className="flex-1"/>
        </div>

        {clips.map(clip => <ClipCard key={clip._id} clip={clip} handlePlay={() => setactiveClipId(clip._id)}/>)}
        {activeClipId && <ReactAudioPlayer
          src={`http://localhost:3000/api/clips/audio/${activeClipId}`}
          controls
        />}
      </div>
    </div>
  )
}

export default Collection