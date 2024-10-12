import { Link } from "react-router-dom";
import school2 from "../assets/school2.svg";
import logo from "../assets/logo.svg"
import { useState } from "react";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [code, setCode] = useState("");
  const [response, setResponse] = useState({ success: null, message: null, field: null });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("role : ", role);
    if (role == "admin" || role == "teacher") {

      try {

        const res = await fetch(`${import.meta.env.VITE_URL}/api/auth/signup/admin`, {
          headers: {
            "Content-type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({ email: email, password: password, role: role, code: code })
        })
        const data = await res.json();
        setResponse({
          success: data.success,
          message: data.message,
          field: data.field
        })

        if (data.success == true) {
          setEmail("")
          setPassword("")
          setCode("");
        }
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    } else {
      try {

        const res = await fetch(`${import.meta.env.VITE_URL}/api/auth/signup`, {
          headers: {
            "Content-type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({ email: email, password: password, role: "student" })
        })
        const data = await res.json();

        setResponse({
          success: data.success,
          message: data.message,
          field: data.field
        })

        if (data.success == true) {
          setEmail("")
          setPassword("")
        }
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    }
  }
  const ErrorMessage = ({ fieldName }: { fieldName: string }) => {
    return response && response.success === false && response.field === fieldName ? (
      <div className="text-sm text-red-500 flex items-center mt-2 gap-1">
        <svg className="w-5" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#EF4444">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <g id="add" fill="#EF4444" transform="translate(42.666667, 42.666667)">
              <path d="M213.333333,3.55271368e-14 C331.136,3.55271368e-14 426.666667,95.5306667 426.666667,213.333333 C426.666667,331.136 331.136,426.666667 213.333333,426.666667 C95.5306667,426.666667 3.55271368e-14,331.136 3.55271368e-14,213.333333 C3.55271368e-14,95.5306667 95.5306667,3.55271368e-14 213.333333,3.55271368e-14 Z M262.250667,134.250667 L213.333333,183.168 L164.416,134.250667 L134.250667,164.416 L183.168,213.333333 L134.250667,262.250667 L164.416,292.416 L213.333333,243.498667 L262.250667,292.416 L292.416,262.250667 L243.498667,213.333333 L292.416,164.416 L262.250667,134.250667 Z" />
            </g>
          </g>
        </svg>
        <h4>{response.message}</h4>
      </div>
    ) : null;
  };
  return (
    <div className="bg-customBlue flex w-full lg:mt-[5rem] lg:mb-[10rem] justify-center">
      <div className="authContainer bg-customBlue2 p-12 rounded-sm w-full sm:w-[500px] lg:w-[800px] xl:w-[1000px]">
        <div className="flex gap-3 items-center mb-10">
          <img src={logo} className="w-[50px]" />
          <h1 className="text-2xl text-white font-bold">EduCare</h1>
        </div>

        <div className="grid grid-cols-6 gap-10">
          <div className="col-span-6 lg:col-span-3">
            <div className="text-4xl text-white font-bold">Signup Now</div>
            <div className="text-customBlack mb-12">
              Software designed for business
            </div>

            <form action="" onSubmit={handleSubmit}>
              <div className="grid gap-5">
                <div>
                  <label className="text-customBlack font-bold text-sm" htmlFor="">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full block p-2 text-white text-sm rounded-sm outline-none bg-customPlaceholder"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <ErrorMessage fieldName="email" />
                </div>
                <div>
                  <label className="text-customBlack font-bold text-sm" htmlFor="">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="block p-2 text-white text-sm bg-customPlaceholder rounded-sm outline-none w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <ErrorMessage fieldName="password" />


                </div>
                <div>
                  <label className="text-customBlack block font-bold text-sm" htmlFor="">
                    Role
                  </label>
                  <select value={role} onChange={(e) => setRole(e.target.value)} className="bg-customPlaceholder text-sm p-2 w-full">
                    <option value="" className="">Select a role : </option>
                    <option value="admin" className="">Admin</option>
                    <option value="student" className="">Student</option>
                    <option value="teacher" className="">Teacher</option>
                  </select>
                  <ErrorMessage fieldName="role" />


                </div>
                {role == "teacher" || role == "admin" ? (
                  <div>
                    <label className="text-customBlack font-bold text-sm" htmlFor="">
                      {role.charAt(0).toUpperCase() + role.slice(1)} Code
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your code"
                      className="block p-2 text-white text-sm bg-customPlaceholder rounded-sm outline-none w-full"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />

                    <ErrorMessage fieldName="code" />

                  </div>

                ) : null}


                {response.success === true && (
                  <div className="text-sm text-[#928EF2] flex items-center mt-2 gap-1">
                    <svg className="w-5" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#928EF2" fillRule="evenodd" d="M3 10a7 7 0 019.307-6.611 1 1 0 00.658-1.889 9 9 0 105.98 7.501 1 1 0 00-1.988.22A7 7 0 113 10zm14.75-5.338a1 1 0 00-1.5-1.324l-6.435 7.28-3.183-2.593a1 1 0 00-1.264 1.55l3.929 3.2a1 1 0 001.38-.113l7.072-8z"></path> </g></svg>
                    <h4>{response.message}</h4>
                  </div>

                )}
                <div>
                  <button className="bg-customLightBlue w-full text-white text-lg font-semibold rounded-md py-2">
                    Signup
                  </button>
                </div>
              </div>
            </form>
            <div className="text-center text-white mt-12">
              Already have an account? <span className="text-customBlue font-bold cursor-pointer"><Link to="/login" className="text-customLightBlue">Login</Link></span>
            </div>
          </div>

          <div className="col-span-3  hidden lg:flex items-center justify-center">
            <img src={school2} alt="" className="w-[500px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

