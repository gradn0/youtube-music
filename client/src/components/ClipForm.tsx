import { SubmitHandler, useForm } from "react-hook-form"
import { fetchFromAPI } from "../utils/fetchFromAPI";

interface Fields {
  title: string,
  collection: string,
  videoId: string,
  startMins: number,
  startSecs: number,
  endMins: number,
  endSecs: number
}

const ClipForm = () => {
  const {register, handleSubmit} = useForm<Fields>();

  const onSubmit: SubmitHandler<Fields> = (data) => {
    const clip = {
      title: data.title,
      playlist: data.collection,
      videoId: data.videoId,
      start: (data.startMins*60*1000) + (data.startSecs*1000),
      end: (data.endMins*60*1000) + (data.endSecs*1000)
    }
    console.log(clip)
    fetchFromAPI("clips", "post", clip)
    .then(json => console.log(json))
  }

  return (
    <form 
      id="clipForm" 
      className="flex flex-col bg-modalGray w-[20em] p-4 gap-4 rounded shadow-xl text-textGray absolute z-20 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
      onSubmit={handleSubmit(onSubmit)}
    >

      <h2 className="text-subheading">New Clip</h2>
      <input 
        type="text"
        placeholder="Title"
        className="input"
        {...register("title", {required: true, maxLength: 40})}
      />

      <input 
        type="text"
        placeholder="Collection"
        className="input"
        {...register("collection", {required: true, maxLength: 40})}
      />

      <input 
        type="text"
        placeholder="Video ID"
        className="input"
        {...register("videoId", {required: true})}
      />

      <div className="flex text-body text-textGray justify-between">
        <p className="">Interval</p>

        <div className="flex gap-1">
          <input 
            className="w-[4ch] input text-center" 
            type="text"
            {...register("startMins", {required: true})}
          />:
          <input 
            className="w-[4ch] input text-center" 
            type="text"
            {...register("startSecs", {required: true})}
          />

          <p className="mx-2">to</p>
          <input 
            className="w-[4ch] input text-center" 
            type="text"
            {...register("endMins", {required: true})}
          />:
          <input 
            className="w-[4ch] input text-center" 
            type="text"
            {...register("endSecs", {required: true})}
          />
        </div>
        
      </div>
      <button type="submit">Create</button>
    </form>
  )
}

export default ClipForm