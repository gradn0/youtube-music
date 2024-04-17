const DropDown = (
  {options, handleClick}: 
  {options: String[], handleClick: (i: number) => void}
) => {
  return (
    <div className="absolute bg-modalGray p-2 text-textGray rounded shadow-xl">
      <ul className="space-y-2">
        {options.map((option, i) => <li className="cursor-pointer hover:text-white" key={i} onClick={() => handleClick(i)}>{option}</li>)}
      </ul>
    </div>
  )
}

export default DropDown