import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
  const {dispatch} = useAuthContext();

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({type: "logout"});
  }

  return {logout};
}
export default useLogout