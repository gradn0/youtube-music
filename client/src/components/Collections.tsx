import { useEffect, useState } from "react"
import CollectionCard from "./CollectionCard"
import { Link } from "react-router-dom"
import PlusIcon from "./icons/PlusIcon"
import DropDown from "./DropDown"
import { fetchFromAPI } from "../utils/fetchFromAPI"
import ClipForm from "./ClipForm"

export interface Collection {
  _id: any,
  createdAt: String,
  title: String,
  updatedAt: String
}

const Collections = () => {
  const [collections, setcollections] = useState<Collection[]>([])
  const [addDropdownOpen, setaddDropdownOpen] = useState(false);
  const [clipFormOpen, setclipformOpen] = useState(false);

  const closeAll = (e: React.MouseEvent<Element, MouseEvent>) => {
    addDropdownOpen && setaddDropdownOpen(false);
    clipFormOpen && !document.getElementById("clipForm")?.contains(e.target as HTMLElement) && setclipformOpen(false) ;
  }

  const openForm = (i: number) => {
    setaddDropdownOpen(false);
    if (i === 0) { 
      // Create collection
    }
    else { 
      setclipformOpen(true);
    }
  }

  useEffect(() => {
    fetchFromAPI("playlists", "get")
    .then((json) => setcollections(json));
  }, [])
  
  return (
    <>
    <div onClick={(e) => closeAll(e)} className="bg-lightGray size-full p-10">

      {clipFormOpen && <ClipForm />}

      <div className="flex">
        <div className="relative flex flex-nowrap items-center pb-10 gap-4">
          <h2 className="text-heading">My Collections</h2>
          <PlusIcon handleClick={() => setaddDropdownOpen(prev => !prev)}/>
          {addDropdownOpen && <span className="left-[100%] top-[100%]"><DropDown options={["New Collection", "New Clip"]} handleClick={(i) => openForm(i)}/></span>}
        </div>
      
      </div>
      <div className="flex flex-wrap gap-10">
        {collections.map(collection => <span key={collection._id}><Link to={`/collection/${collection.title}`}><CollectionCard collection={collection}/></Link></span>)}  
      </div>
    </div>
    </>
  )
}

export default Collections