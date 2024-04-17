import { useEffect, useState } from "react"
import CollectionCard from "./CollectionCard"
import { Link } from "react-router-dom"
import PlusIcon from "./icons/PlusIcon"
import DropDown from "./DropDown"
import { fetchFromAPI } from "../utils/fetchFromAPI"

export interface Collection {
  _id: any,
  createdAt: String,
  title: String,
  updatedAt: String
}

const Collections = () => {
  const [collections, setcollections] = useState<Collection[]>([])
  const [addDropdownOpen, setaddDropdownOpen] = useState(false);

  const add = (i: number) => {
    setaddDropdownOpen(false);
    console.log("hi")
  }

  useEffect(() => {
    fetchFromAPI("playlists", "get")
    .then((json) => setcollections(json));
  }, [])
  
  return (
    <>
    <div onClick={(e) => (e.target as HTMLElement).id !== "plusIcon" ? setaddDropdownOpen(false) : null} className="bg-lightGray size-full p-10">
      <div className="flex">
        <div className="relative flex flex-nowrap items-center pb-10 gap-4">
          <h2 className="text-heading">My Collections</h2>
          <PlusIcon handleClick={() => setaddDropdownOpen(prev => !prev)}/>
          {addDropdownOpen && <span className="left-[100%] top-[100%]"><DropDown options={["New Collection", "New Clip"]} handleClick={(i) => add(i)}/></span>}
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