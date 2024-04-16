import { useEffect, useState } from "react"
import CollectionCard from "./CollectionCard"

export interface collection {
  _id: any,
  createdAt: String,
  title: String,
  updatedAt: String
}

const Collections = () => {
  const [collections, setcollections] = useState<collection[]>([])

  useEffect(() => {
    fetch("http://localhost:3000/api/playlists/")
    .then(res => res.json())
    .then(json => setcollections(json))
  }, [])
  
  return (
    <div className="bg-lightGray size-full p-10">
      <h2 className="text-heading pb-10">My Collections</h2>
      <div className="flex flex-wrap gap-10">
        {collections.map(collection => <CollectionCard key={collection._id} collection={collection}/>)}  
      </div>
    </div>
  )
}

export default Collections