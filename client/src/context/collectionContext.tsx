import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { Collection } from "../components/Collections";

export interface CollectionContextInterface {
  collections: Collection[]
  setcollections: Dispatch<SetStateAction<Collection[]>>
}

const defaultState = {
  collections: [],
  setcollections: (collections: Collection[]) => {}
} as CollectionContextInterface

export const CollectionContext = createContext(defaultState);


export const CollectionContextProvider = ({children}: {children: ReactNode}) => {
  const [collections, setcollections] = useState<Collection[]>([])
  return (
    <CollectionContext.Provider value={{collections, setcollections}}>
      {children}
    </CollectionContext.Provider>
  )
}