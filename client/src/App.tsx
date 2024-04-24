import { Outlet } from "react-router-dom"
import SideBar from "./components/SideBar"
import toast, { Toaster } from "react-hot-toast"

export const notify = (message: string) => toast(message);

function App() {
  return (
    <div className="bg-darkGray h-screen">
      <div className="flex size-full">
        <SideBar />
        <div className="bg-lightGray size-full p-2 sm:p-8">
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
      </div>
    </div>
  )
}

export default App
