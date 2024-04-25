import { createContext, SetStateAction, Dispatch, useState, ReactNode, useContext } from "react";
import { Clip } from "../components/Collection";

type Active = Clip | null;

type ClipContext = {
  clips: Clip[];
  active: Active;
  queue: Clip[];
  setclips: Dispatch<SetStateAction<Clip[]>>;
  setactive: Dispatch<SetStateAction<Active>>;
  setqueue: Dispatch<SetStateAction<Clip[]>>;
}

export const ClipContext = createContext<ClipContext | null>(null);

export const ClipContextProvider = ({children}: {children: ReactNode}) => {
  const [clips, setclips] = useState<Clip[]>([]);
  const [active, setactive] = useState<Active>(null);
  const [queue, setqueue] = useState<Clip[]>([]);

  return (
    <ClipContext.Provider value={{clips, active, queue, setqueue, setclips, setactive}}>
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

