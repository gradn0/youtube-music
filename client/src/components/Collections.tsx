import { useState } from "react"
import CollectionCard from "./CollectionCard"

export interface collection {
  title: String,
  date: String
}

const testColl: collection = {
  title: "Title",
  date: "Apr 16, 2024"
}

const Collections = () => {
  const [collections, setcollections] = useState([testColl, testColl])
  return (
    <div className="bg-lightGray size-full p-10">
      <h2 className="text-heading pb-10">My Collections</h2>
      <div className="flex flex-wrap gap-10">
        {collections.map(collection => <CollectionCard collection={collection}/>)}  
      </div>
    </div>
  )
}

export default Collections