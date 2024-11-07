import { jwtDecode, JwtPayload } from "jwt-decode";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import { SuccessResponse } from "../types/Response.types";

interface CustomJwtPayload extends JwtPayload {
  //get the role from the jwt 
  role: string;
}
interface ServerResponse {
  firstName: string,
  lastName: string,
  role: string,
  birthdate: string
  phone: string,
  gender: string,
  LRN: string,
}
function Account() {
  const token = useSelector((state: RootState) => state.authReducer.token);
  if (!token) {
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
  const [personalInfo, setPersonalInfo] = useState<ServerResponse>({
    firstName: "",
    lastName: "",
    role: "",
    phone: "",
    gender: "",
    birthdate: "2000-01-01",
    LRN: ""
  })
  const [addressInfo, setAddressInfo] = useState({
    country: "",
    state: "",
    city: "",
    postal: "",
  })
  const [response, setResponse] = useState<SuccessResponse>({
    success: null,
    message: null,
    field: null
  });

  const fetchUserInfo = async () => {
    if (token) {
      const res = await fetch(`${import.meta.env.VITE_URL}/api/account/get-userinfo`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await res.json();
      if (data) {
        setPersonalInfo({
          firstName: data.firstName,
          lastName: data.lastName,
          role: data.role,
          phone: data.phone ? data.phone : "",
          birthdate: data.birthdate,
          gender: data.gender,
          LRN: data.lrn ? data.lrn : ""
        })
      }
      console.log(data);

      setAddressInfo({
        country:data.country,
        postal: data.postalCode,
        city : data.city,
        state : data.state
      })
    }
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_URL}/api/account/create-userinfo`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          FirstName: personalInfo.firstName,
          LastName: personalInfo.lastName,
          Role: personalInfo.role,
          Birthdate: personalInfo.birthdate,
          Phone: personalInfo.phone,
          Gender: personalInfo.gender,
          LRN: personalInfo.LRN,
          Country: addressInfo.country,
          State: addressInfo.state,
          City: addressInfo.city,
          PostalCode: addressInfo.postal,
        })
      });
      const data = await res.json();
      setResponse({
        success: data.success,
        message: data.message,
        field: data.field
      })
      console.log(response.message);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
  const sectionStyle = "grid place-items-center sm:flex items-center border-2 bg-customBlue2 rounded-lg border-customBlue2 p-8  gap-5 md:mb-0"
  const detailsStyle = "md:grow rounded-lg bg-customBlue2 grid gap-2 p-8 "
  const inputStyle = "block w-full  border-2 border-customBlue3 bg-transparent px-3 py-2 text-xs rounded-lg outline-none"
  return (
    <div className="grow mb-28">
      <div className="flex z-10 justify-center px-10 mt-12">

        <div className="userInfo-container w-full lg:w-[700px] xl:w-[850px]">
          <div className="grid gap-5 md:gap-10">
            <div className={sectionStyle}>

              <div className="w-[100px] h-[100px]   rounded-full bg-customLightBlue overflow-hidden flex justify-center items-center ">
                <img src={`https://scontent.fmnl9-4.fna.fbcdn.net/v/t39.30808-6/464069775_2117845201950317_3382011828864461100_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeGC24_n4jLVlP-el97sxwdfL3SBbdzAxp4vdIFt3MDGnhSs6THo0-Yftk1BF4if0hsqBLzy66ebHFgNdal1eEq7&_nc_ohc=r08ILUXbYg8Q7kNvgH42epB&_nc_ht=scontent.fmnl9-4.fna&_nc_gid=AXxEAMBUqJIbrBVBoy0ppn5&oh=00_AYDx7e-UDfu1wke92NLh36-hKjTjljacYEh_MJPkN5bu7g&oe=671FDBDC`} className="w-full h-full rounded-full object-center object-fill" />
              </div>

              <div className="text-center sm:text-start">
                <h1 className="font-semibold text-lg">{personalInfo.firstName.length + personalInfo.lastName.length > 30 ? personalInfo.firstName.slice(0, 15) + "..." + " " + personalInfo.lastName.slice(0, 15) + "..." : personalInfo.firstName + " " + personalInfo.lastName}</h1>
                <h3 className="text-gray-400 text-sm">Las Vegas, Nevada, USA</h3>
                <h3 className="text-gray-500 text-sm">{personalInfo.role ? personalInfo.role[0].toUpperCase() + personalInfo.role.slice(1, personalInfo.role.length) : ""}</h3>
              </div>
            </div>

            {/*PERSONAL INFORMATION TAB*/}
            <form onSubmit={handleSubmit} className="grid gap-5">
              <div className={detailsStyle}>
                <div className="flex justify-between items-center font-semibold">
                  <h1>Personal Information</h1>

                  <div onClick={() => setPersonalInfoEdit(!personalInfoEdit)} className="border-2  border-customBlue3 rounded-full p-2 text-sm flex gap-2 items-center  text-gray-400 cursor-pointer">
                    <svg width="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 6.5L17.5 9M4 20V17.5L16.75 4.75C17.4404 4.05964 18.5596 4.05964 19.25 4.75V4.75C19.9404 5.44036 19.9404 6.55964 19.25 7.25L6.5 20H4Z" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                  </div>

                </div>
                <div className=" md:grow grid text-gray-300 sm:grid-cols-2 md:grid-cols-3 gap-2  text-xs">
                  <div className="grid gap-1">
                    <label className="">First Name</label>

                    {personalInfoEdit ? (
                      <div>
                        <input value={personalInfo.firstName} onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })} type="text" className={inputStyle} placeholder="e.g Brent King" />
                      </div>
                    ) : (
                      <div>
                        <h1 className="font-semibold text-sm">{personalInfo.firstName}</h1>
                      </div>
                    )}
                  </div>
                  <div className="grid gap-1">
                    <label className="">Last Name :</label>
                    {personalInfoEdit ? (
                      <input value={personalInfo.lastName} onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })} type="text" className={inputStyle} placeholder="e.g Brent King" />
                    ) : (
                      <div>
                        <h1 className="font-semibold text-sm">{personalInfo.lastName}</h1>
                      </div>
                    )}
                  </div>
                </div>

                <div className=" md:grow grid text-gray-300 sm:my-2 sm:grid-cols-2 md:grid-cols-3 gap-2  text-xs">
                  <div className="grid gap-1 text-xs">
                    <label className="">Birthdate :</label>
                    {personalInfoEdit ? (
                      <input value={personalInfo.birthdate} onChange={(e) => setPersonalInfo({ ...personalInfo, birthdate: e.target.value })} type="date" className={inputStyle} placeholder="" />
                    ) : (
                      <h1 className="font-semibold text-sm">{personalInfo.birthdate}</h1>
                    )}
                  </div>

                  <div className="grid gap-1 text-xs">
                    <label className="">Phone :</label>
                    {personalInfoEdit ? (
                      <input value={personalInfo.phone} onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })} type="tel" className={inputStyle} placeholder="123-456-7890" />
                    ) : (
                      <h1 className="font-semibold text-sm">{personalInfo.phone}</h1>
                    )}
                  </div>
                </div>

                <div className=" md:grow grid text-gray-300 sm:grid-cols-2 md:grid-cols-3 gap-2  text-xs">
                  <div className="grid gap-1 text-xs">
                    <label className="">Gender :</label>
                    {personalInfoEdit ? (
                      <select value={personalInfo.gender} onChange={(e) => setPersonalInfo({ ...personalInfo, gender: e.target.value })} className={inputStyle}>
                        <option value="">Select your gender : </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <h1 className="font-semibold text-sm">{personalInfo.gender}</h1>
                    )}
                  </div>
                  <div className="grid gap-1 text-xs">
                    <label className="">LRN :</label>
                    {personalInfoEdit ? (
                      <input type="text" value={personalInfo.LRN} onChange={(e) => setPersonalInfo({ ...personalInfo, LRN: e.target.value })} className={inputStyle} placeholder="1234567890" />
                    ) : (
                      <h1 className="font-semibold text-sm">{personalInfo.LRN}</h1>
                    )}
                  </div>
                </div>
                {personalInfoEdit && (
                  <div className="flex justify-between items-center">
                  <div>
                    <ErrorMessage fieldName="personal" response={response}/>
                  </div>
                  <div className=" flex gap-2 mt-5  items-center text-xs">

                    <button onClick={() => setPersonalInfoEdit(false)} className="px-4 py-2 border-2 border-customBlue3 rounded-md">Cancel</button>
                    <button className="px-4 py-2 border-2 border-customLightBlue bg-customLightBlue rounded-md" type="submit">Save</button>
                  </div>
                  </div>
                )}
              </div>

              {/*ADDRESS TAB*/}
              <div className={detailsStyle}>
                <div className="pb-6 flex justify-between items-center font-semibold">
                  <h1>Address Information</h1>

                  <div onClick={() => setAddressInfoEdit(!addressInfoEdit)} className="border-2 border-customBlue3 rounded-full p-2 text-sm flex gap-2 items-center  text-gray-400 cursor-pointer">
                    <svg width="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 6.5L17.5 9M4 20V17.5L16.75 4.75C17.4404 4.05964 18.5596 4.05964 19.25 4.75V4.75C19.9404 5.44036 19.9404 6.55964 19.25 7.25L6.5 20H4Z" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                  </div>
                </div>

                <div className=" md:grow grid text-gray-300 sm:grid-cols-2 md:grid-cols-3 gap-2  text-xs">
                  <div className="grid gap-1">
                    <label className="">Country</label>
                    {addressInfoEdit ? (
                      <input value={addressInfo.country} onChange={(e) => setAddressInfo({ ...addressInfo, country: e.target.value })} type="text" className={inputStyle} placeholder="USA" />
                    ) : (
                      <h1 className="font-semibold text-sm">{addressInfo.country}</h1>
                    )}
                  </div>
                  <div className="grid gap-1">
                    <label className="">Postal Code</label>
                    {addressInfoEdit ? (
                      <input value={addressInfo.postal} onChange={(e) => setAddressInfo({ ...addressInfo, postal: e.target.value })} type="text" className={inputStyle} placeholder="1234" />
                    ) : (
                      <h1 className="font-semibold text-sm">{addressInfo.postal}</h1>
                    )}
                  </div>
                </div>
                <div className=" md:grow sm:mt-2 grid text-gray-300 sm:grid-cols-2 md:grid-cols-3 gap-2  text-xs">
                  <div className="grid gap-1 text-xs">
                    <label className="">City</label>
                    {addressInfoEdit ? (
                      <input value={addressInfo.city} onChange={(e) => setAddressInfo({ ...addressInfo, city: e.target.value })} type="text" className={inputStyle} placeholder="San Francisco" />
                    ) : (
                      <h1 className="font-semibold text-sm">{addressInfo.city}</h1>
                    )}
                  </div>
                  <div className="grid gap-1 text-xs">
                    <label className="">State</label>
                    {addressInfoEdit ? (
                      <input value={addressInfo.state} onChange={(e) => setAddressInfo({ ...addressInfo, state: e.target.value })} type="text" className={inputStyle} placeholder="California" />
                    ) : (
                      <h1 className="font-semibold text-sm">{addressInfo.state}</h1>
                    )}
                  </div>
                </div>

                {addressInfoEdit && (
                  <div className="flex justify-between items-center">
                  <div>
                    <ErrorMessage fieldName="address" response={response}/>
                  </div>
                  <div className="flex gap-2 mt-5  items-center text-xs">

                    <button onClick={() => setAddressInfoEdit(false)} className="px-4 py-2 border-2 border-customBlue3 rounded-md">Cancel</button>
                    <button className="px-4 py-2 border-2 border-customLightBlue bg-customLightBlue rounded-md" type="submit">Save</button>
                  </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Account;
