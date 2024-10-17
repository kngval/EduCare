
function Account() {
  return (
    <div className="grow  max-h-screen overflow-hidden ">
      <div className="header w-full h-[200px] flex justify-center z-0 items-center bg-customLightBlue">
        <img src={`https://www.teachersnotepad.com/wp-content/uploads/cyberpunk-writing-prompts-header.jpg`} className="w-full h-full "/>
      </div>
      <div className="flex z-10 justify-center px-10 -mt-12">

      <div className="userInfo-container w-full  md:w-auto overflow-scroll bg-customBlue2 border-2 border-customLightBlue  rounded-xl p-4 ">

        <form className="md:flex md:gap-5">
          <div className="flex items-center justify-center mb-5 md:mb-0">

            <div className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] rounded-full bg-customLightBlue overflow-hidden flex justify-center items-center ">
              <img src={`https://scontent.fmnl9-4.fna.fbcdn.net/v/t39.30808-6/463134045_2112849699116534_5817732615927707140_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHnHsBohklch4qR-lAQBjjNsJbqgF_Ec1iwluqAX8RzWNL7RE3M6mXcJtVAbkIyQzdmcXXLkuywt6XEWjz2lWop&_nc_ohc=Gy34CzbBPacQ7kNvgG0yD2i&_nc_ht=scontent.fmnl9-4.fna&_nc_gid=ATCjVXSiOjikc8YgkxveXHx&oh=00_AYDZDsUt2IhP4w32MWb5Bbgh020eqKhnn3WADNiUR6FgqQ&oe=6716B118`} className="w-full h-full rounded-full object-center object-fill"/>
            </div>

          </div>

          <div className="md:grow grid gap-2 md:gap-5 ">

            <div className=" md:grow grid md:grid-cols-3 gap-2 md:gap-5 text-xs">
              <div className="grid gap-1">
                <label className="font-semibold">First Name :</label>
                <input type="text" className="block w-full  bg-customPlaceholder px-3 py-2 text-xs rounded-sm outline-none" placeholder="e.g Brent King" />
              </div>
              <div className="grid gap-1">
                <label className="font-semibold">Middle Name :</label>
                <input type="text" className="block w-full  bg-customPlaceholder px-3 py-2 text-xs rounded-sm outline-none" placeholder="e.g Sto.Tomas" />
              </div>
              <div className="grid gap-1">
                <label className="font-semibold">Last Name :</label>
                <input type="text" className="block w-full  bg-customPlaceholder px-3 py-2 text-xs rounded-sm outline-none" placeholder="e.g Valino" />
              </div>
            </div>
          
              <div className="grid gap-1 text-xs">
                <label className="font-semibold">Birthdate :</label>
                <input type="date" className="block w-full  bg-customPlaceholder px-3 py-2 text-xs rounded-sm outline-none" placeholder="e.g Valino" />
              </div>

          </div>

        
        </form>
      </div>
</div>
    </div>
  )
}
export default Account;
