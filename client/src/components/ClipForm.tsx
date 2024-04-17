const ClipForm = () => {

  return (
    <form id="clipForm" className="flex flex-col bg-modalGray w-[20em] p-4 gap-4 rounded shadow-xl text-textGray absolute z-20 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <h2 className="text-subheading">New Clip</h2>
      <input 
        type="text"
        placeholder="Name"
        className="input"
      />

      <input 
        type="text"
        placeholder="Collection"
        className="input"
      />

      <input 
        type="text"
        placeholder="Video ID"
        className="input"
      />
      <div className="flex text-body text-textGray justify-between">

        <p className="">Interval</p>

        <div className="flex gap-1">
          <input className="w-[4ch] input text-center" type="text"/>:
          <input className="w-[4ch] input text-center" type="text"/>

          <p className="mx-2">to</p>

          <input className="w-[4ch] input text-center" type="text"/>:
          <input className="w-[4ch] input text-center" type="text"/>
        </div>
        
      </div>

    </form>
  )
}

export default ClipForm