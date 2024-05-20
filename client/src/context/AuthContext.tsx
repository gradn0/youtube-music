import { PropsWithChildren, createContext, useReducer } from "react"

interface State {
  user: string | null;
} 
interface Action {
  type: "login" | "logout";
  payload: string;
} 
interface AuthContext {
  state: State;
  dispatch: any;
}
type Props = PropsWithChildren;

export const authReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'login':
      return {user: action.payload};
    case 'logout':
      return {user: null};
    default:
      return state;
  }
}

export const authContext = createContext<AuthContext | null>(null);
const initState = {user: null};

export const AuthContextProvider = ({children}: Props) => {

  const [state, dispatch] = useReducer(authReducer, initState)

  return (
    <authContext.Provider value={{state, dispatch}}>
      {children}
    </authContext.Provider>
  )
}