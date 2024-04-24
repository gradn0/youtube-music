import { SubmitHandler, useForm } from "react-hook-form"
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { ExitIcon } from "./Icons";
import { useContext } from "react";
import { CollectionContext } from "../context/collectionContext";

interface Fields {
  title: string
}

const CollectionForm = ({handleClose}: {handleClose: () => void}) => {
  const {collections, setcollections} = useContext(CollectionContext);

  const {
    register, 
    handleSubmit,
    formState: {errors, isSubmitting},
    setError
  } = useForm<Fields>();

  const onSubmit: SubmitHandler<Fields> = async (data) => {
    if (collections.filter(collection => collection.title === data.title).length !== 0) {
      setError("title", {message: "Collection already exists"});
      return;
    }

    const collection = {
      title: data.title
    }

    fetchFromAPI("playlists", "post", collection)
    .then(res => {  
      handleClose();
      setcollections([...collections, res]);
    })
    .catch(() => {
      // something went wrong
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
        <h2 className="text-subheading">New Collection</h2>
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

      <button disabled={isSubmitting} className="mt-4" type="submit">{isSubmitting? "Loading..." : "Create"}</button>
    </form>
  )
}

export default CollectionForm