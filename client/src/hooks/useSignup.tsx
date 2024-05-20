import { useState } from "react"
import { BASE_URL } from "../utils/fetchFromAPI";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const {dispatch} = useAuthContext();

  const signUp = async (email:string, password:string) => {
    seterror(null);
    setloading(true);
    const res = await fetch(`${BASE_URL}/user/signup`, {
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
    }
  }

  return {signUp, loading, error};
}
export default useSignup