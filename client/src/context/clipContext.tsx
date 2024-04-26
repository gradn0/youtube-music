import { createContext, SetStateAction, Dispatch, useState, ReactNode, useContext } from "react";
import { Clip } from "../components/Collection";

type ClipContext = {
  clips: Clip[];
  queue: Clip[];
  currentQueueIndex: number;
  setclips: Dispatch<SetStateAction<Clip[]>>;
  setqueue: Dispatch<SetStateAction<Clip[]>>;
  setcurrentQueueIndex: Dispatch<SetStateAction<number>>;
}

export const ClipContext = createContext<ClipContext | null>(null);

export const ClipContextProvider = ({children}: {children: ReactNode}) => {
  const [clips, setclips] = useState<Clip[]>([]);
  const [queue, setqueue] = useState<Clip[]>([]);
  const [currentQueueIndex, setcurrentQueueIndex] = useState<number>(0);

  return (
    <ClipContext.Provider value={{clips, queue, currentQueueIndex, setqueue, setclips, setcurrentQueueIndex}}>
      {children}
    </ClipContext.Provider>
  )
}

export const useClipsContext = () => {
  const context = useContext(ClipContext);
  if(!context) {
    throw new Error("Context cannot be used outside of provider")
  };
  return context;
}

