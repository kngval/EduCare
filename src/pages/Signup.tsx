import { Link } from "react-router-dom";
import school1 from "../assets/school1.svg";
import { useState } from "react";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email != "" && password != "") {
      try {
        const res = await fetch("http://localhost:5287/api/auth/signup", {
          headers: {
            "Content-type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({ email: email, password: password, role: "student" })
        })
        const data = await res.json();
        setSuccessMsg(data.message);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <div className="bg-[#ededed] flex w-full h-screen items-center justify-center">
      <div className=" bg-white p-12 rounded-sm w-[1000px]">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl text-customBlue font-bold">EduCare</h1>
        </div>

        <div className="grid grid-cols-6 gap-10">
          <div className="col-span-3">
            <div className="text-4xl text-customBlack font-bold">Signup Now</div>
            <div className="text-customBlack mb-12">
              Enter your account details
            </div>

            <form action="" onSubmit={handleSubmit}>
              <div className="grid gap-5">
                <div>
                  <label className="text-customBlack font-bold " htmlFor="">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full block p-2 text-sm rounded-sm outline-none bg-gray-300"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                </div>
                <div>
                  <label className="text-customBlack font-bold" htmlFor="">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="block p-2 text-sm bg-gray-300 rounded-sm outline-none w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {successMsg && (
                  <div className="text-sm text-red-500 flex items-center justify-center gap-1"><svg className="w-5" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg"  fill="#EF4444"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>error-filled</title> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="add" fill="#EF4444" transform="translate(42.666667, 42.666667)"> <path d="M213.333333,3.55271368e-14 C331.136,3.55271368e-14 426.666667,95.5306667 426.666667,213.333333 C426.666667,331.136 331.136,426.666667 213.333333,426.666667 C95.5306667,426.666667 3.55271368e-14,331.136 3.55271368e-14,213.333333 C3.55271368e-14,95.5306667 95.5306667,3.55271368e-14 213.333333,3.55271368e-14 Z M262.250667,134.250667 L213.333333,183.168 L164.416,134.250667 L134.250667,164.416 L183.168,213.333333 L134.250667,262.250667 L164.416,292.416 L213.333333,243.498667 L262.250667,292.416 L292.416,262.250667 L243.498667,213.333333 L292.416,164.416 L262.250667,134.250667 Z" id="Combined-Shape"> </path> </g> </g> </g></svg>
                    <h4>{successMsg}</h4>

                  </div>
                )}
                <div>
                  <button className="bg-customBlue w-full text-white text-lg font-semibold rounded-md py-2">
                    Signup
                  </button>
                </div>
              </div>
            </form>
            <div className="text-center mt-12">
              Already have an account? <span className="text-customBlue font-bold cursor-pointer"><Link to="/login">Login</Link></span>
            </div>
          </div>

          <div className="col-span-3">
            <img src={school1} alt="" className="w-[500px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

