import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import dashboardsvg from "../assets/Navbar/dashboard.svg";
import sectionsvg from "../assets/Navbar/sections.svg";
import gradesvg from "../assets/Navbar/grades.svg";
import accountsvg from "../assets/Navbar/account.svg";
import settingsvg from "../assets/Navbar/settings.svg";
import logoutsvg from "../assets/Navbar/logout.svg";
import logo from "../assets/logo.svg";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useEffect, useState } from "react";
import { getRole } from "../utils/getRole";

function Navbar() {
  const token = useSelector((state: RootState) => state.authReducer.token);
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const [toggle, setToggle] = useState<boolean>(false);
  // const [role ,setRole] = useState("");
      

  if (!token) {
    return;
  }
  const role = getRole(token);

  function isActive(path: string): boolean {
    return location.pathname.startsWith(path);
  }
  return (
    <>
      <nav className={` navbar-main lg:hidden sm:px-12 sm:py-6 z-50`}>
        <div className={` flex justify-between  bg-customBlue2 rounded-lg py-3 px-8`}>
          <Link to="/" className="font-bold flex items-center gap-3">
            <img src={logo} className="w-5" />
            EduCare
          </Link>
          <div onClick={() => setToggle(!toggle)} className={` w-8 cursor-pointer`}>
            {!toggle ? (
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 7L4 7" stroke="#6359E9" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M20 12L4 12" stroke="#6359E9" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M20 17L4 17" stroke="#6359E9" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>

            ) : (
              <svg onClick={() => setToggle(!toggle)} className="w-6 py-1 lg:hidden" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z" fill="#6359E9"></path></g></svg>

            )}        
          </div>

        </div>
      </nav>

      <div className={`fixed z-50 min-h-screen top-0 -left-full lg:sticky lg:left-0 ${toggle ? "left-0" : "-left-full"} transition-all ease-in-out duration-500 w-[250px] xl:w-[300px]  bg-customBlue2 `}>
        <div className={`w-full flex justify-end  py-4 pr-5 cursor-pointer lg:cursor-auto`}>
          <svg onClick={() => setToggle(!toggle)} className="w-5 lg:hidden" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z" fill="#6359E9"></path></g></svg>
        </div>
        <div className="text-2xl  font-bold px-[2.5rem]">
          <Link to="/" className="flex mb-12 items-center gap-3">
            <img src={logo} className="w-5 " />
            <span className="text-md">
              EduCare
            </span>
          </Link>
        </div>

        {/*<hr className="border-1 border-customLightBlue mb-10" />*/}
        <div className="w-full flex justify-center">
          <div className="navlinks w-[90%] text-sm grid gap-3">

            <div className="">
              <Link to="/dashboard" className={`${isActive("/dashboard") ? "bg-customLightBlue" : "bg-none"}  px-3  py-4 flex items-center  rounded-lg`}>
                <img src={dashboardsvg} className="mx-3 w-5" />
                <h3 className="font-semibold ">Dashboard</h3>
              </Link>
            </div>
  
            {/*admin only endpoint !!!*/}
            {role && role === "admin" && (
            <div className="">
              <Link to="/admin" className={`${isActive("/admin") ? "bg-customLightBlue" : "bg-none"}  px-3  py-4 flex items-center  rounded-lg`}>
                <img src={dashboardsvg} className="mx-3 w-5" />
                <h3 className="font-semibold ">Admin / Teacher</h3>
              </Link>
            </div>
            )}

            <div className="">
              <Link to="/rooms" className={`${isActive("/rooms")  ? "bg-customLightBlue" : "bg-none"} px-3  py-4 flex items-center  rounded-lg`}>
                <img src={sectionsvg} className="mx-3 w-5" />
                <h3 className="font-semibold ">Rooms</h3>
              </Link>
            </div>

            <div className="">
              <Link to="/grades" className={`${isActive("/grades") ? "bg-customLightBlue" : "bg-none"}  px-3  py-4 flex items-center  rounded-lg`}>
                <img src={gradesvg} className="mx-3 w-5" />
                <h3 className="font-semibold ">Grades</h3>
              </Link>
            </div>


            <div className="">
              <Link to="/account" className={`${isActive("/account") ? "bg-customLightBlue" : "bg-none"}  px-3  py-4 flex items-center  rounded-lg`}>
                <img src={accountsvg} className="mx-3 w-5" />
                <h3 className="font-semibold ">Account</h3>
              </Link>
            </div>


            <div className="">
              <Link to="/settings" className={`${isActive("/settings") ? "bg-customLightBlue" : "bg-none"}  px-3  py-4 flex items-center  rounded-lg`}>
                <img src={settingsvg} className="mx-3 w-5" />
                <h3 className="font-semibold ">Settings</h3>
              </Link>
            </div>


            <div className="">
              <button onClick={() => dispatch(logout())} type="button" className="  px-3  py-4 flex items-center  rounded-lg">
                <img src={logoutsvg} className="mx-3 w-5" />
                <h3 className="font-semibold ">Logout</h3>
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar;
