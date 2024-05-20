const DropDown = (
  {options, handleClick, handleMouseLeave}: 
  {options: String[], handleClick: (i: number) => void, handleMouseLeave: () => void} // handler passes index of selected option to parent 
) => {
  return (
    <div onMouseLeave={handleMouseLeave} className="relative bg-modalGray p-2 text-textGray text-nowrap rounded shadow-xl z-20">
      <ul className="space-y-2">
        {options.map((option, i) => <li className="cursor-pointer hover:text-white" key={i} onClick={() => handleClick(i)}>{option}</li>)}
      </ul>
    </div>
  )
}

export default DropDown