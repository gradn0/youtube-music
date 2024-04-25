import { Link } from "react-router-dom"
import { Collection } from "./Collections"
import { VerticalEllipsis } from "./Icons"
import { useState } from "react"
import DropDown from "./DropDown"
import EditText from "./EditText"

const CollectionCard = ({collection, handleUpdate, handleDelete}: {
  collection: Collection, 
  handleUpdate: (title: string) => void, 
  handleDelete: () => void
}) => {

  const [menuOpen, setmenuOpen] = useState(false);
  const [editMode, seteditMode] = useState(false);

  const handleOption = (i: number) => {
    setmenuOpen(false)
    switch (i) {
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
    <div className="inline-block space-y-2 relative">
      <Link to={`/collection/${collection.title}`}><div className="bg-veryLightGray p-10 min-h-[10em] min-w-[10em] shadow-xl cursor-pointer"></div></Link>

      {!editMode && <h2 className="text-white font-semibold text-lg text-center">{collection.title}</h2>}
      {editMode && <EditText placeholderText={collection.title} handleSubmit={(title) => handleTextEdit(title)}/>}

      <span className="absolute right-0 bottom-0">
        <VerticalEllipsis handleClick={() => setmenuOpen(prev => !prev)}/>
        {menuOpen && <span className="absolute right-[9em] top-full">
        <DropDown 
          options={["Edit", "Delete"]} 
          handleClick={(i) => handleOption(i)} 
          handleMouseLeave={() => setmenuOpen(false)}
        />
      </span>}
      </span>
      
      
    </div>
  )
}

export default CollectionCard