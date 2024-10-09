import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import dashboardsvg from "../../assets/Navbar/dashboard.svg";
import sectionsvg from "../../assets/Navbar/sections.svg";
import gradesvg from "../../assets/Navbar/grades.svg";
import accountsvg from "../../assets/Navbar/account.svg";
import settingsvg from "../../assets/Navbar/settings.svg";
import logoutsvg from "../../assets/Navbar/logout.svg";
import logo from "../../assets/logo.svg";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

function Navbar() {
  const token = useSelector((state: RootState) => state.authReducer.token);
  const location = useLocation();
  const dispatch = useDispatch();

  
  if(!token)
  {
    return;
  }

  function isActive(path:string):boolean{
    return location.pathname.startsWith(path);
  }
  return (
    <>
    <div className=" justify-center  py-6 hidden">
      <div className="w-[800px] bg-customBlue2 p-4 rounded-lg">
      <div className="font-bold text-lg">EduCare</div>
      </div>
    </div>

    <div className="h-screen w-[300px] px-6 bg-customBlue2 ">
      <div className="h-[150px] text-3xl font-bold flex items-center gap-3">
          <img src={logo} className="w-[50px]"/>
          EduCare
        </div>
      
      <div className="navlinks grid gap-3">
    
      <div className="">
      <Link to="/dashboard" className={`${isActive("/dashboard") ? "bg-customLightBlue" : "bg-none"}  px-3  py-4 flex items-center  rounded-lg`}>
        <img src={dashboardsvg} className="mx-3 w-5"/>
        <h3 className="font-semibold ">Dashboard</h3>
      </Link>
      </div>

      <div className="">
      <Link to="/sections" className={`${isActive("/sections") ? "bg-customLightBlue" : "bg-none"} px-3  py-4 flex items-center  rounded-lg`}>
        <img src={sectionsvg} className="mx-3 w-5"/>
        <h3 className="font-semibold ">Sections</h3>
      </Link>
      </div>

      <div className="">
      <Link to="/grades" className={`${isActive("/grades") ? "bg-customLightBlue" : "bg-none"}  px-3  py-4 flex items-center  rounded-lg`}>
        <img src={gradesvg} className="mx-3 w-5"/>
        <h3 className="font-semibold ">Grades</h3>
      </Link>
      </div>
      

      <div className="">
      <Link to="/account" className={`${isActive("/account") ? "bg-customLightBlue" : "bg-none"}  px-3  py-4 flex items-center  rounded-lg`}>
        <img src={accountsvg} className="mx-3 w-5"/>
        <h3 className="font-semibold ">Account</h3>
      </Link>
      </div>

      <hr className="border-1 border-customLightBlue"/>

      <div className="">
      <Link to="/settings" className={`${isActive("/settings") ? "bg-customLightBlue" : "bg-none"}  px-3  py-4 flex items-center  rounded-lg`}>
        <img src={settingsvg} className="mx-3 w-5"/>
        <h3 className="font-semibold ">Settings</h3>
      </Link>
      </div>


      <div className="">
      <button onClick={() => dispatch(logout())} type="button"  className="  px-3  py-4 flex items-center  rounded-lg">
        <img src={logoutsvg} className="mx-3 w-5"/>
        <h3 className="font-semibold ">Logout</h3>
      </button>
      </div>

      </div>
    </div>
    </>
  )
}

export default Navbar;
