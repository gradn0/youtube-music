import { Link } from "react-router-dom"
import { Home, Profile } from "./Icons"
import useLogout from "../hooks/useLogout"
import DropDown from "./DropDown";
import { useState } from "react";

const SideBar = () => {
  const {logout} = useLogout();
  const [profileMenuOpen, setprofileMenuOpen] = useState(false);

  return (
    <div className="bg-veryLightGray py-4 px-6 rounded-2xl h-full shadow-lg flex xs:flex-col gap-6">
      <Link to={"/"}><Home /></Link>
      <span className="relative">
        <Profile handleClick={() => setprofileMenuOpen(prev => !prev)}/>
        {profileMenuOpen && 
          <span className="absolute top-[130%]">
            <DropDown 
              options={["Logout"]} 
              handleClick={() => logout()} 
              handleMouseLeave={() => setprofileMenuOpen(false)}/>
          </span>}

      </span>
    </div>
  )
}

export default SideBar