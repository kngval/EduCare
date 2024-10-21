import { jwtDecode, JwtPayload } from "jwt-decode";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";

interface CustomJwtPayload extends JwtPayload {
  //get the role from the jwt 
  role: string;
}

function Account() {
  const token = useSelector((state: RootState) => state.authReducer.token);
  if(!token)
  {
    return null;
  } 
 useEffect(() => {
    try {
      if (token) {
        let decodedToken: CustomJwtPayload = jwtDecode(token);
        console.log(decodedToken.role);
        setPersonalInfo({ ...personalInfo, role: decodedToken.role })
      }
      fetchUserInfo();
    } catch (err) {
      console.error(err);
    }
  }, [token])
  const [personalInfoEdit, setPersonalInfoEdit] = useState<boolean>(false);
  const [addressInfoEdit, setAddressInfoEdit] = useState<boolean>(false);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "Jane",
    lastName: "Doe",
    role: "Student",
    email: "",
    phone: "",
    gender: "",
    birthdate: "",
  })
  const [addressInfo, setAddressInfo] = useState({
    country: "",
    state: "",
    city: "",
    postal: "",
  })
 

  const fetchUserInfo = async () => {
    if (token) {
      const res = await fetch(`${import.meta.env.VITE_URL}/api/account/get-userinfo`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await res.json();
      console.log(data);
    }
  }
  // const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   
  //   const res = await fetch(`${import.meta.env.VITE_URL}/api/`);
  //
  // }

  return (
    <div className="grow mb-28">
      <div className="flex z-10 justify-center px-10 mt-12">

        <div className="userInfo-container w-full lg:w-[700px] xl:w-[850px] overflow-scroll">
          <div className="grid gap-5 md:gap-10">
            <div className="grid place-items-center sm:flex items-center border-2 border-customBlue2 p-8  gap-5 md:mb-0">

              <div className="w-[100px] h-[100px]   rounded-full bg-customLightBlue overflow-hidden flex justify-center items-center ">
                <img src={`https://scontent.fmnl9-4.fna.fbcdn.net/v/t39.30808-6/463134045_2112849699116534_5817732615927707140_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHnHsBohklch4qR-lAQBjjNsJbqgF_Ec1iwluqAX8RzWNL7RE3M6mXcJtVAbkIyQzdmcXXLkuywt6XEWjz2lWop&_nc_ohc=Gy34CzbBPacQ7kNvgG0yD2i&_nc_ht=scontent.fmnl9-4.fna&_nc_gid=ATCjVXSiOjikc8YgkxveXHx&oh=00_AYDZDsUt2IhP4w32MWb5Bbgh020eqKhnn3WADNiUR6FgqQ&oe=6716B118`} className="w-full h-full rounded-full object-center object-fill" />
              </div>

              <div className="text-center sm:text-start">
                <h1 className="font-semibold text-lg">{personalInfo.firstName + " " + personalInfo.lastName}</h1>
                <h3 className="text-gray-400 text-sm">Las Vegas, Nevada, USA</h3>
                <h3 className="text-gray-500 text-sm">{personalInfo.role ? personalInfo.role[0].toUpperCase() + personalInfo.role.slice(1,personalInfo.role.length): ""}</h3>
              </div>
            </div>

            {/*PERSONAL INFORMATION TAB*/}
            <div className="md:grow border-2 border-customBlue2 grid gap-2 p-8 md:gap-5 ">
              <div className="pb-4 flex justify-between items-center font-semibold">
                <h1>Personal Information</h1>

                <div onClick={() => setPersonalInfoEdit(!personalInfoEdit)} className="border-2 border-customBlue2 rounded-full p-2 text-sm flex gap-2 items-center  text-gray-400 cursor-pointer">
                  <svg width="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 6.5L17.5 9M4 20V17.5L16.75 4.75C17.4404 4.05964 18.5596 4.05964 19.25 4.75V4.75C19.9404 5.44036 19.9404 6.55964 19.25 7.25L6.5 20H4Z" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                </div>
              </div>

              <div className=" md:grow grid text-gray-300 sm:grid-cols-2 md:grid-cols-3 gap-2  text-xs">
                <div className="grid gap-1">
                  <label className="">First Name</label>
                  {personalInfoEdit ? (
                    <input value={personalInfo.firstName} onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })} type="text" className="block w-full  border-2 border-customBlue2 bg-transparent px-3 py-2 text-xs rounded-sm outline-none" placeholder="e.g Brent King" />
                  ) : (
                    <h1 className="font-semibold text-sm">{personalInfo.firstName}</h1>
                  )}
                </div>
                <div className="grid gap-1">
                  <label className="">Last Name :</label>
                  {personalInfoEdit ? (
                    <input value={personalInfo.lastName} onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })} type="text" className="block w-full  border-2 border-customBlue2 bg-transparent px-3 py-2 text-xs rounded-sm outline-none" placeholder="e.g Brent King" />
                  ) : (
                    <h1 className="font-semibold text-sm">{personalInfo.lastName}</h1>
                  )}
                </div>
              </div>
              <div className=" md:grow grid text-gray-300 sm:grid-cols-2 md:grid-cols-3 gap-2  text-xs">
                <div className="grid gap-1 text-xs">
                  <label className="">Email :</label>
                  {personalInfoEdit ? (
                    <input value={personalInfo.email} onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })} type="text" className="block w-full  border-2 border-customBlue2 bg-transparent px-3 py-2 text-xs rounded-sm outline-none" placeholder="e.g Brent King" />
                  ) : (
                    <h1 className="font-semibold text-sm">{personalInfo.email}</h1>
                  )}
                </div>

                <div className="grid gap-1 text-xs">
                  <label className="">Phone :</label>
                  {personalInfoEdit ? (
                    <input value={personalInfo.phone} onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })} type="tel" className="block w-full  border-2 border-customBlue2 bg-transparent px-3 py-2 text-xs rounded-sm outline-none" placeholder="123-456-7890" />
                  ) : (
                    <h1 className="font-semibold text-sm">{personalInfo.phone}</h1>
                  )}
                </div>
              </div>

              <div className=" md:grow grid text-gray-300 sm:grid-cols-2 md:grid-cols-3 gap-2  text-xs">
                <div className="grid gap-1 text-xs">
                  <label className="">Gender :</label>
                  {personalInfoEdit ? (
                    <select value={personalInfo.gender} onChange={(e) => setPersonalInfo({ ...personalInfo, gender: e.target.value })} className="block w-full  border-2 border-customBlue2 bg-transparent px-3 py-2 text-xs rounded-sm outline-none">
                      <option>Select your gender : </option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  ) : (
                    <h1 className="font-semibold text-sm">{personalInfo.phone}</h1>
                  )}
                </div>
                <div className="grid gap-1 text-xs">
                  <label className="">Birthdate :</label>
                  {personalInfoEdit ? (
                    <input value={personalInfo.birthdate} onChange={(e) => setPersonalInfo({ ...personalInfo, birthdate: e.target.value })} type="date" className="block w-full  border-2 border-customBlue2 bg-transparent px-3 py-2 text-xs rounded-sm outline-none" placeholder="" />
                  ) : (
                    <h1 className="font-semibold text-sm">{personalInfo.birthdate}</h1>
                  )}
                </div>
              </div>
              {personalInfoEdit && (

                <div className="w-full flex gap-2 mt-5 justify-end items-center text-xs">

                  <button onClick={() => setPersonalInfoEdit(false)} className="px-4 py-2 border-2 border-customBlue2 rounded-md">Cancel</button>
                  <button className="px-6 py-2 bg-customLightBlue rounded-md" type="submit">Save</button>
                </div>
              )}
            </div>

            {/*ADDRESS TAB*/}
            <div className="md:grow border-2 border-customBlue2 grid gap-2 p-8 md:gap-5 ">
              <div className="pb-4 flex justify-between items-center font-semibold">
                <h1>Address Information</h1>

                <div onClick={() => setAddressInfoEdit(!addressInfoEdit)} className="border-2 border-customBlue2 rounded-full p-2 text-sm flex gap-2 items-center  text-gray-400 cursor-pointer">
                  <svg width="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 6.5L17.5 9M4 20V17.5L16.75 4.75C17.4404 4.05964 18.5596 4.05964 19.25 4.75V4.75C19.9404 5.44036 19.9404 6.55964 19.25 7.25L6.5 20H4Z" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                </div>
              </div>

              <div className=" md:grow grid text-gray-300 sm:grid-cols-2 md:grid-cols-3 gap-2  text-xs">
                <div className="grid gap-1">
                  <label className="">Country</label>
                  {addressInfoEdit ? (
                    <input value={addressInfo.country} onChange={(e) => setAddressInfo({ ...addressInfo, country: e.target.value })} type="text" className="block w-full  border-2 border-customBlue2 bg-transparent px-3 py-2 text-xs rounded-sm outline-none" placeholder="USA" />
                  ) : (
                    <h1 className="font-semibold text-sm">{addressInfo.country}</h1>
                  )}
                </div>
                <div className="grid gap-1">
                  <label className="">Postal Code</label>
                  {addressInfoEdit ? (
                    <input value={addressInfo.postal} onChange={(e) => setAddressInfo({ ...addressInfo, postal: e.target.value })} type="text" className="block w-full  border-2 border-customBlue2 bg-transparent px-3 py-2 text-xs rounded-sm outline-none" placeholder="1234" />
                  ) : (
                    <h1 className="font-semibold text-sm">{addressInfo.postal}</h1>
                  )}
                </div>
              </div>
              <div className=" md:grow grid text-gray-300 sm:grid-cols-2 md:grid-cols-3 gap-2  text-xs">
                <div className="grid gap-1 text-xs">
                  <label className="">City</label>
                  {addressInfoEdit ? (
                    <input value={addressInfo.city} onChange={(e) => setAddressInfo({ ...addressInfo, city: e.target.value })} type="text" className="block w-full  border-2 border-customBlue2 bg-transparent px-3 py-2 text-xs rounded-sm outline-none" placeholder="San Francisco" />
                  ) : (
                    <h1 className="font-semibold text-sm">{addressInfo.city}</h1>
                  )}
                </div>
                <div className="grid gap-1 text-xs">
                  <label className="">State</label>
                  {addressInfoEdit ? (
                    <input value={addressInfo.state} onChange={(e) => setAddressInfo({ ...addressInfo, state: e.target.value })} type="text" className="block w-full  border-2 border-customBlue2 bg-transparent px-3 py-2 text-xs rounded-sm outline-none" placeholder="California" />
                  ) : (
                    <h1 className="font-semibold text-sm">{addressInfo.state}</h1>
                  )}
                </div>
              </div>

              {addressInfoEdit && (

                <div className="w-full flex gap-2 mt-5 justify-end items-center text-xs">

                  <button onClick={() => setAddressInfoEdit(false)} className="px-4 py-2 border-2 border-customBlue2 rounded-md">Cancel</button>
                  <button className="px-6 py-2 bg-customLightBlue rounded-md" type="submit">Save</button>
                </div>
              )}
            </div>


            {/*
          <form className="">
            <div className="md:grow bg-customBlue2 grid gap-2 p-8 md:gap-5 ">
              <div className="pb-4 font-semibold">Personal Information</div>

              <div className=" md:grow grid text-gray-300 md:grid-cols-3 gap-2 md:gap-5 text-xs">
                <div className="grid gap-1">
                  <label className="">First Name :</label>
                  <input type="text" className="block w-full  bg-customPlaceholder px-3 py-2 text-xs rounded-sm outline-none" placeholder="e.g Brent King" />
                </div>
                <div className="grid gap-1">
                  <label className="">Middle Name :</label>
                  <input type="text" className="block w-full  bg-customPlaceholder px-3 py-2 text-xs rounded-sm outline-none" placeholder="e.g Sto.Tomas" />
                </div>
                <div className="grid gap-1">
                  <label className="">Last Name :</label>
                  <input type="text" className="block w-full  bg-customPlaceholder px-3 py-2 text-xs rounded-sm outline-none" placeholder="e.g Valino" />
                </div>
              </div>

              <div className="grid gap-1 text-xs">
                <label className="">Birthdate :</label>
                <input type="date" className="block w-full  bg-customPlaceholder px-3 py-2 text-xs rounded-sm outline-none" placeholder="e.g Valino" />
              </div>

            </div>
          </form>
          */}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Account;
