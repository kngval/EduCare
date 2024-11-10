import { useEffect, useState } from "react";
import { CodeType } from "../types/CodeType";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

function Admin() {
  const token = useSelector((state: RootState) => state.authReducer.token);
  const [codes, setCodes] = useState<CodeType[]>();

  useEffect(() => {
    if (token) {
      fetchCodes();
      console.log(codes);
    }
  }, [token]);

  const fetchCodes = async () => {
    try {
      const res = await fetch("http://localhost:5287/api/admin/fetch-codes", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res) {
        const data = await res.json();
        console.log(data);
        setCodes(data);
      }

    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="grow mb-28 p-12">
      <div className="grid">

        <div className="flex justify-end">
          <div className="bg-customLightBlue w-[200px] flex justify-center items-center gap-3 text-sm  py-2 rounded-lg">
            <svg className="w-[15px]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g data-name="add" id="add-2"> <g> <line fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12" x2="12" y1="19" y2="5"></line> <line fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="5" x2="19" y1="12" y2="12"></line> </g> </g> </g> </g></svg>
            <button>Generate Auth Code</button>
          </div>
        </div>

        {/* Display Codes here */}
        <div className="grid gap-3">
          <div className="grid grid-cols-5 text-center p-2">
            <div>Code</div>
            <div>Availability</div>
            <div>User</div>
          </div>
          {codes && codes.length > 0 ? (
            codes.map((code) => (
              <div className="bg-customBlue2 grid grid-cols-5 place-items-center py-4  text-sm">
                <div>{code.userCode.code}</div>
                <div>{code.userCode.available == true ? (
                  <div className="flex items-center justify-start gap-2">
                    <div className="w-3 h-3 rounded-full bg-customLightBlue"></div>
                    Available
                    <div className="w-3"></div>
                  </div>
                ) : (
                  <div className="flex justify-start items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    Unavailable
                  </div>
                )}
                </div>
                <div>
                  {code.userEmail != null ? (
                  <h1>{code.userEmail}</h1>
                  ) : (
                  <h1>No user</h1>
                  )}
                </div>
              </div>
            ))

          ) : (
            <div>No Codes Available</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Admin;
