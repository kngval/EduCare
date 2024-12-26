import { Link } from "react-router-dom";
import school2 from "../assets/school2.svg";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/authSlice";
import logo from "../assets/logo.svg"
import ErrorMessage from "../components/ErrorMessage";
import { AuthPayloadSuccess } from "../types/Response.types";
import { AppDispatch } from "../redux/store";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [code, setCode] = useState("");
  const [response, setResponse] = useState({ success: false, message: "", field: "" });

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (role == "admin" || role == "teacher") {

      try {
        const res = await fetch(`${import.meta.env.VITE_URL}/api/auth/login/admin`, {
          headers: {
            "Content-type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({ email: email, password: password, role: role, code: code })
        })

        const data: AuthPayloadSuccess = await res.json();

        setResponse({
          success: data.success,
          message: data.message,
          field: data.field
        })


        if (data.success == true) {
          dispatch(setToken(data.token))
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

        const res = await fetch(`${import.meta.env.VITE_URL}/api/auth/login`, {
          headers: {
            "Content-type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({ email: email, password: password, role: role })
        })
        const data: AuthPayloadSuccess = await res.json();

        setResponse({
          success: data.success,
          message: data.message,
          field: data.field
        })

        if (data.success == true) {
          dispatch(setToken(data.token))
          setEmail("")
          setPassword("")
        }
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <div className="bg-customBlue flex w-full lg:min-h-screen mt-[5rem] lg:mt-0 lg:items-center justify-center">
      <div className="authContainer bg-customBlue2 mb-24 lg:mb-0 p-12 rounded-sm w-full  sm:w-[500px] lg:w-[800px] xl:w-[1000px]">
        <Link to="/" className="flex gap-3 items-center mb-10 cursor-pointer">
          <img src={logo} className="w-[30px]" />
          <h1 className="text-2xl text-white font-bold">EduCare</h1>
        </Link>

        <div className="grid grid-cols-6 gap-10">
          <div className="col-span-6 lg:col-span-3">
            <div className="text-4xl text-white font-bold">Login Now</div>
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
                  <ErrorMessage fieldName="email" response={response} />

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
                  <ErrorMessage fieldName="password" response={response} />

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
                  <ErrorMessage fieldName="role" response={response} />


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

                    <ErrorMessage fieldName="code" response={response} />

                  </div>

                ) : null}

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

