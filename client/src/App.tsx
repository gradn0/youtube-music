import { Outlet } from "react-router-dom"
import SideBar from "./components/SideBar"

function App() {
  return (
    <div className="bg-darkGray h-screen p-5 pt-8">
      <div className="flex size-full">
        <SideBar />
        <div className="bg-lightGray size-full p-8">
          <Outlet />
        </div>
      </div>
      
    </div>
  )
}

export default App
