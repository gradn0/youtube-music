const Pause = ({handleClick}: {handleClick: () => void}) => {
  return (
    <div onClick={handleClick} className="bg-accent inline-block p-4 rounded-full cursor-pointer hover:bg-accentLight">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" 
        className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
      </svg>
    </div>
  )
}

export default Pause