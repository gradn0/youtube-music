import { useState } from "react"
import { BASE_URL } from "../utils/fetchFromAPI";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export type AuthType = "login" | "signup";

const useAuth = (type: AuthType) => {
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const {dispatch} = useAuthContext();
  const navigate = useNavigate();

  const authenticate = async (email:string, password:string) => {
    seterror(null);
    setloading(true);
    const res = await fetch(`${BASE_URL}/user/${type}`, {
      method: "POST",
      body: JSON.stringify({email, password}), 
      headers: {
        "Content-Type": "application/json"
      }
    });
    const json = await res.json();
    
    if (!res.ok) {
      setloading(false);
      seterror(json.error);
    } 
    if (res.ok) {
      setloading(false);
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({type: "login", payload: json});
      navigate("/");
    }
  }

  return {authenticate, loading, error};
}
export default useAuth