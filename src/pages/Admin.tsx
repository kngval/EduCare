
function Admin() {

  return (
    <div className="grow mb-28 p-12">
      <div className="grid">

        <div className="flex justify-end">
          <div className="bg-customLightBlue w-[200px] flex justify-center items-center gap-3 text-sm  py-2 rounded-lg">
            <svg className="w-[15px]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g data-name="add" id="add-2"> <g> <line fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12" x2="12" y1="19" y2="5"></line> <line fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="5" x2="19" y1="12" y2="12"></line> </g> </g> </g> </g></svg>
            <button>Generate Auth Code</button>
          </div>
        </div>
      
        {/* Display Codes here */}
        <div>
           
        </div>
      </div>
    </div>
  )
}

export default Admin;
