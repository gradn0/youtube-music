import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useClipsContext } from "../context/clipContext";
import { useCollectionContext } from "../context/collectionContext";

const useLogout = () => {
  const {dispatch} = useAuthContext();
  const navigate = useNavigate();
  const {setclips, setqueue, setcurrentQueueIndex} = useClipsContext();
  const {setcollections} = useCollectionContext();

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({type: "logout"});
    setclips([]);
    setcollections([]);
    setqueue([]);
    setcurrentQueueIndex(0);
    navigate("/login");
  }

  return {logout};
}
export default useLogout