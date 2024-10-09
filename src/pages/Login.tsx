import { Link } from "react-router-dom";
import school2 from "../assets/school2.svg";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/authSlice";
import logo from "../assets/logo.svg"
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [teacherCode, setTeacherCode] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [response, setResponse] = useState({ success: null, message: null, field: null });

  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_URL}/api/auth/login`, {
        headers: {
          "Content-type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ email: email, password: password })
      })
      const data = await res.json();

      if (data) {

        setResponse({
          success: data.success,
          message: data.message,
          field: data.field
        })
        console.log(response)
        if (data.token != null) {

          dispatch(setToken(data.token));
        }

        console.log(data);
      }

    } catch (err) {
      console.error(err);
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
    <div className="bg-customBlue flex w-full h-screen items-center justify-center">
      <div className="authContainer bg-customBlue2 p-12 rounded-sm w-full sm:w-[500px] lg:w-[800px] xl:w-[1000px]">
        <div className="flex gap-3 items-center mb-10">
          <img src={logo} className="w-[50px]" />
          <h1 className="text-2xl text-white font-bold">EduCare</h1>
        </div>

        <div className="grid grid-cols-6 gap-10">
          <div className="col-span-6 lg:col-span-3">
            <div className="text-4xl text-white font-bold">Login Now</div>
            <div className="text-customBlack mb-12">
              Software designed for your business
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

                  {response && response.success === false && response.field == "email" && (
                    <div className="text-sm text-red-500 flex items-center mt-2 gap-1"><svg className="w-5" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#EF4444"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>error-filled</title> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="add" fill="#EF4444" transform="translate(42.666667, 42.666667)"> <path d="M213.333333,3.55271368e-14 C331.136,3.55271368e-14 426.666667,95.5306667 426.666667,213.333333 C426.666667,331.136 331.136,426.666667 213.333333,426.666667 C95.5306667,426.666667 3.55271368e-14,331.136 3.55271368e-14,213.333333 C3.55271368e-14,95.5306667 95.5306667,3.55271368e-14 213.333333,3.55271368e-14 Z M262.250667,134.250667 L213.333333,183.168 L164.416,134.250667 L134.250667,164.416 L183.168,213.333333 L134.250667,262.250667 L164.416,292.416 L213.333333,243.498667 L262.250667,292.416 L292.416,262.250667 L243.498667,213.333333 L292.416,164.416 L262.250667,134.250667 Z" id="Combined-Shape"> </path> </g> </g> </g></svg>
                      <h4>{response.message}</h4>

                    </div>
                  )}
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
                  {response && response.success === false && response.field == "password" && (
                    <div className="text-sm text-red-500 flex items-center mt-2 gap-1"><svg className="w-5" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#EF4444"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>error-filled</title> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="add" fill="#EF4444" transform="translate(42.666667, 42.666667)"> <path d="M213.333333,3.55271368e-14 C331.136,3.55271368e-14 426.666667,95.5306667 426.666667,213.333333 C426.666667,331.136 331.136,426.666667 213.333333,426.666667 C95.5306667,426.666667 3.55271368e-14,331.136 3.55271368e-14,213.333333 C3.55271368e-14,95.5306667 95.5306667,3.55271368e-14 213.333333,3.55271368e-14 Z M262.250667,134.250667 L213.333333,183.168 L164.416,134.250667 L134.250667,164.416 L183.168,213.333333 L134.250667,262.250667 L164.416,292.416 L213.333333,243.498667 L262.250667,292.416 L292.416,262.250667 L243.498667,213.333333 L292.416,164.416 L262.250667,134.250667 Z" id="Combined-Shape"> </path> </g> </g> </g></svg>
                      <h4>{response.message}</h4>

                    </div>
                  )}

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
                {role == "teacher" && (
                  <div>
                    <label className="text-customBlack font-bold text-sm" htmlFor="">
                      Teacher Code
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your code"
                      className="block p-2 text-white text-sm bg-customPlaceholder rounded-sm outline-none w-full"
                      value={teacherCode}
                      onChange={(e) => setTeacherCode(e.target.value)}
                    />

                    <ErrorMessage fieldName="teacherCode" />

                  </div>

                )}
                {role == "admin" && (
                  <div>
                    <label className="text-customBlack font-bold text-sm" htmlFor="">
                      Admin Code
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your code"
                      className="block p-2 text-white text-sm bg-customPlaceholder rounded-sm outline-none w-full"
                      value={adminCode}
                      onChange={(e) => setAdminCode(e.target.value)}
                    />

                    <ErrorMessage fieldName="teacherCode" />

                  </div>

                )}

                <div>
                  <button type="submit" className="bg-customLightBlue w-full text-white text-lg font-semibold rounded-md py-2">
                    Login
                  </button>
                </div>
              </div>
            </form>
            <div className="text-center text-white mt-12">
              Don't have an account? <span className="text-customBlue font-bold cursor-pointer"><Link to="/signup" className="text-customLightBlue">Sign Up</Link></span>
            </div>
          </div>

          <div className="col-span-3 hidden lg:flex items-center justify-center">
            <img src={school2} alt="" className=" w-[500px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

