import { ExitIcon } from "./Icons"
import { SubmitHandler, useForm } from "react-hook-form"

type Props = {
  entity: string,
  handleFormSubmit: (data: Fields) => void, 
  handleClose: () => void
}

interface Fields {
  title: string
}

const EditForm = ({entity, handleClose, handleFormSubmit}: Props) => {

  const {
    register, 
    handleSubmit,
    formState: {errors},
  } = useForm<Fields>();

  const onSubmit: SubmitHandler<Fields> = async (data) => {
    handleFormSubmit(data);
  }

  return (
    <form 
      id="editForm" 
      className="flex flex-col bg-modalGray w-[90%] p-4 gap-1 rounded shadow-xl 
        text-textGray absolute z-20 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
        xs:w-[20em]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex justify-between">
        <h2 className="text-subheading">Edit {entity}</h2>
        <ExitIcon handleClick={handleClose}/>
      </div>
      
      <input 
        type="text"
        placeholder="Title"
        className="input mt-4"
        {...register("title", {
          required: "Title required", 
          maxLength: {
            value: 40,
            message: "Maximum length reached"
          }
        })}
      />
      {errors.title && <p className="text-highlight">{errors.title.message}</p>}
      <button className="mt-4" type="submit">Create</button>
    </form>
  )
}

export default EditForm