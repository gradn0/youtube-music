import { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom"
import ClipCard from "./ClipCard";
import ReactAudioPlayer from "react-audio-player";
import { BASE_URL, fetchFromAPI } from "../utils/fetchFromAPI";
import { notify } from "../App";

export interface Clip {
  _id: any,
  title: string,
  playlist: string,
  videoId: string,
  start: number,
  end: number,
  createdAt: string
}

const Collection = () => {
  const { collectionTitle } = useParams();
  const [clips, setclips] = useState<Clip[]>([])
  const [activeClipId, setactiveClipId] = useState(null);
  const [_, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    fetchFromAPI(`clips/byPlaylist/${collectionTitle}`, "get")
    .then((json) => setclips(json))
    .catch(() => {
      notify("Could not fetch clips");
    })
  }, [])

  const updateClip = (id: string, title: string) => {
    fetchFromAPI(`clips/${id}`, "PATCH", {title: title})
    .then(() => {
      clips.map((clip) => {
        if (clip._id === id) {
          clip.title = title;
          forceUpdate();
        }
      })
      notify("Clip updated");
    })
    .catch(() => {
      notify("Failed to update clip");
    })
  }

  const deleteClip = (id: string) => {
    fetchFromAPI(`clips/${id}`, "delete")
    .then(() => {
      const clip = clips.filter(clip => clip._id === id)[0];
      clips.splice(clips.indexOf(clip), 1);
      forceUpdate();
      notify("Clip deleted");
    })
    .catch(() => {
      notify("Could not delete clip");
    })
  }

  return (
    <div>
      <h2 className="text-heading pb-10">{collectionTitle}</h2>
      <div className="flex flex-col">

        <div className="flex text-white opacity-55 text-small p-2 border-veryLightGray border-b-[1px] cursor-pointer gap-5">
          <p className="flex-1 text-nowrap overflow-x-hidden">Title</p>
          <span className="flex-1"/>
          <p className="flex-1 hidden lg:block">Date Added</p>
          <span className="flex-1"/>
          <span className="flex-1"/>
        </div>

        {clips.map(clip => 
        <ClipCard 
          key={clip._id} 
          clip={clip} 
          handlePlay={() => setactiveClipId(clip._id)} 
          handleUpdate={(title) => updateClip(clip._id, title)}
          handleDelete={() => deleteClip(clip._id)}
        />)}
        {activeClipId && <ReactAudioPlayer
          src={`${BASE_URL}/clips/audio/${activeClipId}`}
          controls
        />}
      </div>
    </div>
  )
}

export default Collection