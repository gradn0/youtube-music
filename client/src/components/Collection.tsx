import { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom"
import ClipCard from "./ClipCard";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { notify } from "../App";
import { useClipsContext } from "../context/clipContext";
import { Shuffle } from "./Icons";
import { shuffleClone } from "../utils/helpers";

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
  const [_, forceUpdate] = useReducer(x => x + 1, 0);
  const {clips, queue, setclips, setqueue} = useClipsContext();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    fetchFromAPI(`clips/byPlaylist/${collectionTitle}`, "get")
    .then((json) => {
      setclips(json);
      setloading(false);
    })
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

      const queueClip = queue.filter(clip => clip._id === id)[0];
      if (queueClip) queue.splice(queue.indexOf(queueClip), 1);
      
      forceUpdate();
      notify("Clip deleted");
    })
    .catch(() => {
      notify("Could not delete clip");
    })
  }

  return (
    <div>
      <div className="flex items-center pb-10 gap-4">
        <h2 className="text-heading">{collectionTitle}</h2>
        <span className="pt-1"><Shuffle handleClick={() => setqueue(shuffleClone(clips))}/></span>
      </div>
      
      {!loading && <div className="flex flex-col">
        <div className="border-veryLightGray border-b-[1px]"/>
        {clips.map(clip => 
        <ClipCard 
          key={clip._id} 
          clip={clip} 
          handlePlay={() => setqueue([clip])} 
          handleUpdate={(title) => updateClip(clip._id, title)}
          handleDelete={() => deleteClip(clip._id)}
        />)}
      </div>}
    </div>
  )
}

export default Collection