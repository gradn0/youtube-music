import MainSection from "./components/MainSection"
import SideBar from "./components/SideBar"

function App() {
  return (
    <div className="bg-darkGray h-screen p-5 pt-8">
      <div className="flex size-full">
        <SideBar />
        <MainSection />
      </div>
      
    </div>
  )
}

export default App
