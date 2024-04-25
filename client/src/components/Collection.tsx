import { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom"
import ClipCard from "./ClipCard";
import ReactAudioPlayer from "react-audio-player";
import { BASE_URL, fetchFromAPI } from "../utils/fetchFromAPI";
import { notify } from "../App";
import { useClipsContext } from "../context/clipContext";

export interface Clip {
  _id: any,
  title: string,
  playlist: string,
  videoId: string,
  start: number,
  end: number,
  createdAt: string,
  thumbnail: string
}

const Collection = () => {
  const { collectionTitle } = useParams();
  const [activeClipId, setactiveClipId] = useState(null);
  const [_, forceUpdate] = useReducer(x => x + 1, 0);
  const {clips, setclips} = useClipsContext();

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

        <div className="border-veryLightGray border-b-[1px]"/>
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