import { useContext, useEffect, useReducer, useState } from "react"
import CollectionCard from "./CollectionCard"
import {PlusIcon} from "./Icons"
import DropDown from "./DropDown"
import { fetchFromAPI } from "../utils/fetchFromAPI"
import ClipForm from "./ClipForm"
import CollectionForm from "./CollectionForm"
import { CollectionContext } from "../context/collectionContext"

export interface Collection {
  _id: any,
  createdAt: string,
  title: string,
  updatedAt: string
}

const Collections = () => {
  const [showMenu, setshowMenu] = useState(false);
  const [clipFormOpen, setclipformOpen] = useState(false);
  const [collectionFormOpen, setcollectionformOpen] = useState(false);

  const {collections, setcollections} = useContext(CollectionContext);
  const [_, forceUpdate] = useReducer(x => x + 1, 0);

  const updateCollection = (id: string, title: string) => {
    const index = collections.findIndex(coll => coll._id === id);
    collections[index].title = title;
    try {
      fetchFromAPI(`playlists/${id}`, "PATCH", {title: title}).then(res => {
        console.log(res);
      })
    } catch (err) {
      // something went wrong
    }
  }

  const deleteCollection = (id: string) => {
    const collection = collections.filter(coll => coll._id === id)[0];
    collections.splice(collections.indexOf(collection), 1);
    fetchFromAPI(`playlists/${collection._id}`, "delete").then(() => 
      forceUpdate()
    )
  }

  const openForm = (i: number) => {
    setshowMenu(false);
    switch (i) {
      case 0: {
        setcollectionformOpen(true); 
        setclipformOpen(false); 
        break;
      }
      case 1: {
        setclipformOpen(true); 
        setcollectionformOpen(false); 
        break;
      }
    }
  }

  useEffect(() => {
    fetchFromAPI("playlists", "get")
    .then((json) => setcollections(json));
  }, [])
  
  return (
    <div className="bg-lightGray size-full p-10">

      {clipFormOpen && <ClipForm handleClose={() => setclipformOpen(false)}/>}
      {collectionFormOpen && <CollectionForm handleClose={() => setcollectionformOpen(false)}/>}

      <div className="flex">
        <div className="relative flex flex-nowrap items-center pb-10 gap-4">
          <h2 className="text-heading">My Collections</h2>
          <PlusIcon handleClick={() => setshowMenu(prev => !prev)}/>
          {showMenu && <span className="left-[100%] top-[100%]">
            <DropDown 
              options={["New Collection", "New Clip"]} 
              handleClick={(i) => openForm(i)} 
              handleMouseLeave={() => setshowMenu(false)}
            />
          </span>}
        </div>
      </div>
      <div className="flex flex-wrap gap-10">
        {collections?.map(collection => 
        <span key={collection._id}>
          <CollectionCard 
            collection={collection} 
            handleUpdate={(title) => updateCollection(collection._id, title)} 
            handleDelete={() => deleteCollection(collection._id)}
          />
        </span>)}  
      </div>
    </div>
  )
}

export default Collections