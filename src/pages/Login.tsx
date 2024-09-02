import school1 from "../assets/school1.svg";

function Login() {
  return (
    <div className="bg-[#F9E6E6] flex w-full h-screen items-center justify-center">
      <div className=" bg-white p-12 rounded-sm w-[1000px]">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl text-customBlue font-bold">EduCare</h1>
          <div>
            <button className="bg-customBlue text-white text-sm font-semibold px-12 py-2 rounded-md">
              SignUp
            </button>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-10">
          <div className="col-span-3">
            <div className="text-4xl text-customBlack font-bold">Login Now</div>
            <div className="text-customBlack mb-12">
              Enter your account details
            </div>

            <form action="">
              <div className="grid gap-5">
                <div>
                  <label className="text-customBlack font-bold " htmlFor="">
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    className="block p-2 text-sm bg-gray-300 rounded-sm outline-none w-full"
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
                  />
                </div>

                <div>
                  <button className="bg-customBlue w-full text-white text-lg font-semibold rounded-md py-2">
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="col-span-3">
            <img src={school1} alt="" className="w-[500px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
