import { Link } from "react-router-dom"
import { Home } from "./Icons"

const SideBar = () => {
  return (
    <div className="bg-veryLightGray py-4 px-6 rounded-2xl h-full shadow-lg">
      <Link to={"/"}><Home /></Link>
    </div>
  )
}

export default SideBar