import { PropsWithChildren, useEffect } from "react"
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({children}: PropsWithChildren) => {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) {
      navigate("/login", {replace: true});
    }
  }, [])

  return children;
}

export default ProtectedRoute