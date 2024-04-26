import { Outlet } from "react-router-dom"
import SideBar from "./components/SideBar"
import toast, { Toaster } from "react-hot-toast"
import AudioPlayer from "./components/AudioPlayer";

export const notify = (message: string) => toast(message);

function App() {
  return (
    <div className="bg-lightGray h-screen">
      <div className="flex flex-col xs:flex-row size-full">
        <nav className="py-8 px-4 sm:py-16 sm:px-8">
          <SideBar />
        </nav>
        
        <div className="bg-lightGray size-full p-8 sm:p-16">
          <div className="h-[85%]">
            <Toaster
              position="top-center"
              reverseOrder={false}
              toastOptions={{
                style: {
                  border: 'none',
                  padding: '2px',
                  color: 'white',
                  background: 'rgb(23, 23, 23)'
                },
              }}
            />
            <Outlet />
          </div>
          
          <div className="h-[15%] flex justify-center">
              <AudioPlayer />
          </div>
        </div>

        
      </div>
    </div>
  )
}

export default App
