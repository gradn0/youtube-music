import { useState } from "react"

const EditText = ({placeholderText, handleSubmit}: {placeholderText: string, handleSubmit: (text: string) => void}) => {
  const [text, settext] = useState(placeholderText);
  const submit = (e: any) => {
    e.preventDefault();
    handleSubmit(text);
  }
  return (
    <form onSubmit={(e) => submit(e)}>
      <input 
        className="bg-mediumGray w-[80%] text-textGray border-0 outline-none" 
        type="text" 
        value={text} 
        onChange={(e) => settext(e.target.value)}
        onFocus={(e) => e.target.select()}
        autoFocus
      />
      <button type="submit" className="hidden"></button>
    </form>
  )
}

export default EditText