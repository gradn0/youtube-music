import { collection } from "./Collections"

const CollectionCard = ({collection}: {collection: collection}) => {
    return (
      <div className="inline-block space-y-2">
        <div className="bg-veryLightGray p-10 min-h-[10em] min-w-[10em]"></div>
        <h2 className="text-white font-semibold text-lg text-center">{collection.title}</h2>
      </div>
    )
  }
  export default CollectionCard