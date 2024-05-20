import { Link } from "react-router-dom"
import { Home } from "./Icons"
import useLogout from "../hooks/useLogout"

const SideBar = () => {
  const {logout} = useLogout();
  return (
    <div className="bg-veryLightGray py-4 px-6 rounded-2xl h-full shadow-lg">
      <Link to={"/"}><Home /></Link>
      <button onClick={logout}>logout</button>
    </div>
  )
}

export default SideBar