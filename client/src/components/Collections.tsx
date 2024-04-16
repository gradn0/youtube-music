import { useEffect, useState } from "react"
import CollectionCard from "./CollectionCard"
import { Link } from "react-router-dom"

export interface Collection {
  _id: any,
  createdAt: String,
  title: String,
  updatedAt: String
}

const Collections = () => {
  const [collections, setcollections] = useState<Collection[]>([])

  useEffect(() => {
    fetch("http://localhost:3000/api/playlists/")
    .then(res => res.json())
    .then(json => setcollections(json))
  }, [])
  
  return (
    <div className="bg-lightGray size-full p-10">
      <h2 className="text-heading pb-10">My Collections</h2>
      <div className="flex flex-wrap gap-10">
        {collections.map(collection => <span key={collection._id}><Link to={`/collection/${collection.title}`}><CollectionCard collection={collection}/></Link></span>)}  
      </div>
    </div>
  )
}

export default Collections