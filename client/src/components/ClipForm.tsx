import { SubmitHandler, useForm } from "react-hook-form"
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { ExitIcon } from "./Icons";
import { useCollectionContext } from "../context/collectionContext";
import { notify } from "../App";
import toast from "react-hot-toast";

interface Fields {
  title: string,
  collection: string,
  videoId: string,
  startMins: number,
  startSecs: number,
  endMins: number,
  endSecs: number
}

const ClipForm = ({handleClose}: {handleClose: () => void}) => {
  const {collections, setcollections} = useCollectionContext();

  const {
    register, 
    handleSubmit,
    formState: {errors, isSubmitting},
    setError
  } = useForm<Fields>();

  const onSubmit: SubmitHandler<Fields> = async (data) => {
    const clip = {
      title: data.title,
      playlist: data.collection,
      videoId: data.videoId,
      start: (data.startMins*60*1000) + (data.startSecs*1000),
      end: (data.endMins*60*1000) + (data.endSecs*1000)
    }

    fetchFromAPI("clips/validateClip", "post", clip)
    .then(res => {
      // validate Clip
      if (res.Error) {
        switch (res.Error) {
          case "Invalid url": {
            setError("videoId", {message: "Invalid ID"});
            return;
          }
        }
      } 
      else {
        handleClose();
        const loader = toast.loading("Creating clip...");
        // create clip
        fetchFromAPI("clips", "post", clip)
        .then(res => {
          toast.dismiss(loader);
          if (res.Error) {
            notify("Failed to create clip")
            return;
          }
          if (res.playlist !== null) setcollections([...collections, res.playlist]);
          notify("Clip created");
        })
        .catch(() => {
          notify("Could not create clip");
        })
      }
    })
    .catch(() => {
      notify("Could not connect to server")
    })
  }

  return (
    <form 
      id="clipForm" 
      className="flex flex-col bg-modalGray w-[90%] p-4 gap-1 rounded shadow-xl 
        text-textGray absolute z-20 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
        xs:w-[20em]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex justify-between">
        <h2 className="text-subheading">New Clip</h2>
        <ExitIcon handleClick={handleClose}/>
      </div>
      
      <input 
        type="text"
        placeholder="Title"
        className="input mt-4"
        autoFocus
        {...register("title", {
          required: "Title required", 
          maxLength: {
            value: 40,
            message: "Maximum length reached"
          }
        })}
      />
      {errors.title && <p className="text-highlight">{errors.title.message}</p>}

      <input 
        type="text"
        placeholder="Collection"
        className="input  mt-4"
        {...register("collection", {
          required: "Collection required", 
          maxLength: {
            value: 40,
            message: "Maximum length reached"
          }
        })}
      />
      {errors.collection && <p className="text-highlight">{errors.collection.message}</p>}

      <input 
        type="text"
        placeholder="Video ID (eg: cc_xmawJ2fg)"
        className="input  mt-4"
        {...register("videoId", {
          required: "Video ID required"
        })}
      />
      {errors.videoId && <p className="text-highlight">{errors.videoId.message}</p>}

      <div className="flex text-body text-textGray justify-between mt-4">
        <p className="">Interval</p>

        <div className="flex gap-1">
          <input 
            className="w-[4ch] input text-center" 
            type="text"
            placeholder="MM"
            {...register("startMins", {
              required: "interval required",
              pattern: {
                value: /[0-1]?[0-9]|2[0-3]/,
                message: "Enter a valid timestamp"
              }
            })}
          />:
          <input 
            className="w-[4ch] input text-center" 
            type="text"
            placeholder="SS"
            {...register("startSecs", {
              required: "interval required",
              pattern: {
                value: /[0-5][0-9]/,
                message: "Enter a valid timestamp"
              }
            })}
          />

          <p className="mx-2">to</p>
          <input 
            className="w-[4ch] input text-center" 
            type="text"
            placeholder="MM"
            {...register("endMins", {
              required: "interval required",
              pattern: {
                value: /[0-1]?[0-9]|2[0-3]/,
                message: "Enter a valid timestamp"
              }
            })}
          />:
          <input 
            className="w-[4ch] input text-center" 
            type="text"
            placeholder="SS"
            {...register("endSecs", {
              required: "interval required",
              pattern: {
                value: /[0-5][0-9]/,
                message: "Enter a valid timestamp"
              }
            })}
          />
        </div>

      </div>

      <p className="text-highlight">
        {
          errors.startMins?.message || 
          errors.startSecs?.message || 
          errors.endMins?.message || 
          errors.endSecs?.message
        }
      </p>
      <button disabled={isSubmitting} className="mt-4" type="submit">{isSubmitting? "Loading..." : "Create"}</button>
    </form>
  )
}

export default ClipForm