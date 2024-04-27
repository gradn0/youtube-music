import { useEffect, useReducer, useState } from "react"
import CollectionCard from "./CollectionCard"
import {PlusIcon} from "./Icons"
import DropDown from "./DropDown"
import { fetchFromAPI } from "../utils/fetchFromAPI"
import ClipForm from "./ClipForm"
import CollectionForm from "./CollectionForm"
import { useCollectionContext } from "../context/collectionContext"
import { notify } from "../App"

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

  const {collections, setcollections} = useCollectionContext();
  const [_, forceUpdate] = useReducer(x => x + 1, 0);

  const updateCollection = (id: string, title: string) => {
    if (collections.findIndex(coll => coll.title === title) !== -1) {
      notify("A collection already exists with that title");
      return;
    } 

    const index = collections.findIndex(coll => coll._id === id);
    collections[index].title = title;

    fetchFromAPI(`playlists/${id}`, "PATCH", {title: title})
    .then(() => {
      notify("Collection updated");
    })
    .catch(() => {
      notify("Unable to edit collection");
    })
  }

  const deleteCollection = (id: string) => {
    const collection = collections.filter(coll => coll._id === id)[0];
    collections.splice(collections.indexOf(collection), 1);
    fetchFromAPI(`playlists/${collection._id}`, "delete")
    .then(() => {
      forceUpdate();
      notify("Collection deleted");
    })
    .catch(() => {
      notify("Could not delete collection");
    })
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
    .then((json) => setcollections(json))
    .catch(() => {
      notify("Could not fetch collections");
    })
  }, [])
  
  return (
    <div className="bg-lightGray size-full relative">
      
      {clipFormOpen && <ClipForm handleClose={() => setclipformOpen(false)}/>}
      {collectionFormOpen && <CollectionForm handleClose={() => setcollectionformOpen(false)}/>}

      <div className="flex justify-center xxs:justify-start items-center">
        <div className="relative flex flex-nowrap items-center pb-10 gap-4">
          <h2 className="text-heading">My Collections</h2>
          <span>
            <PlusIcon handleClick={() => setshowMenu(prev => !prev)}/>
            {showMenu && <span className="left-[100%] top-[110%]">
              <DropDown 
                options={["New Collection", "New Clip"]} 
                handleClick={(i) => openForm(i)} 
                handleMouseLeave={() => setshowMenu(false)}
              />
            </span>}
          </span>
          
        </div>
      </div>
      <div className="flex flex-col xxs:flex-row flex-wrap gap-10 items-center content-center">
        {collections?.map(collection => 
          <CollectionCard 
            key={collection._id}
            collection={collection} 
            handleUpdate={(title) => updateCollection(collection._id, title)} 
            handleDelete={() => deleteCollection(collection._id)}
          />
        )}  
      </div>
    </div>
  )
}

export default Collections