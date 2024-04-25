import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";
import { Collection } from "../components/Collections";

type CollectionContext = {
  collections: Collection[];
  setcollections: Dispatch<SetStateAction<Collection[]>>;
}

export const CollectionContext = createContext<CollectionContext | null>(null);

export const CollectionContextProvider = ({children}: {children: ReactNode}) => {
  const [collections, setcollections] = useState<Collection[]>([]);

  return (
    <CollectionContext.Provider value={{collections, setcollections}}>
      {children}
    </CollectionContext.Provider>
  )
}

export const useCollectionContext = () => {
  const context = useContext(CollectionContext);
  if(!context) {
    throw new Error("Context cannot be used outside of provider")
  };
  return context;
}