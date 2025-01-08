import { useEffect, useState } from "react";
import { CodeType } from "../types/CodeType";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

function Admin() {
  const token = useSelector((state: RootState) => state.authReducer.token);
  const [codes, setCodes] = useState<CodeType[]>();
  const [refresh, setRefresh] = useState<boolean>(false);
  useEffect(() => {
    if (token) {
      fetchCodes();
      console.log(codes);
    }
  }, [token, refresh]);

  const fetchCodes = async () => {
    try {
      const res = await fetch("http://localhost:5287/api/admin/fetch-codes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res) {
        const data = await res.json();
        console.log(data);
        setCodes(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const generateCode = async () => {
    try {
      const res = await fetch("http://localhost:5287/api/admin/create-code", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
      });
      if (res) {
        const data = await res.json();
        console.log(data);
        setRefresh(!refresh);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCode = async (id: number) => {
    try {
      console.log("code id : ", id);
      const res = await fetch(
        `http://localhost:5287/api/admin/delete-code/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "DELETE",
        }
      );
      console.log(res);
      if (res) {
        const data = await res.json();
        console.log(data);
        setRefresh(!refresh);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="grow mb-10 mt-20">
      <div className="grid px-6 lg:px-12">
        <div className="font-bold text-2xl">View Authentication Codes</div>
        <div className="text-sm text-gray-500">Admin - Codes</div>
        <div className="flex justify-end mb-10">
          <div
            onClick={() => generateCode()}
            className="bg-customLightBlue lg:w-[200px] flex justify-center items-center gap-3 text-sm p-2  rounded-lg"
          >
            <svg
              className="w-[20px] lg:w-[15px]"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="#ffffff"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <title></title>{" "}
                <g id="Complete">
                  {" "}
                  <g data-name="add" id="add-2">
                    {" "}
                    <g>
                      {" "}
                      <line
                        fill="none"
                        stroke="#fff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        x1="12"
                        x2="12"
                        y1="19"
                        y2="5"
                      ></line>{" "}
                      <line
                        fill="none"
                        stroke="#fff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        x1="5"
                        x2="19"
                        y1="12"
                        y2="12"
                      ></line>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>{" "}
              </g>
            </svg>
            <button className="hidden md:block">Generate Auth Code</button>
          </div>
        </div>

        {/* Display Codes here */}
        <div className="grid gap-3 ">
          <div className="grid grid-cols-4 lg:grid-cols-5 text-center">
            <div>Code</div>
            <div>Availability</div>
            <div>User</div>
          </div>
          {codes && codes.length > 0 ? (
            codes.map((code) => (
              <div className="bg-customBlue2 sm:rounded-lg grid grid-cols-4 lg:grid-cols-5 place-items-center py-4 text-xs lg:text-sm">
                <div>{code.userCode.code}</div>
                <div>
                  {code.userCode.available == true ? (
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
                <div className="hidden lg:block"></div>
                <div>
                  <svg
                    onClick={() => deleteCode(code.userCode.id)}
                    className="w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M3 6.38597C3 5.90152 3.34538 5.50879 3.77143 5.50879L6.43567 5.50832C6.96502 5.49306 7.43202 5.11033 7.61214 4.54412C7.61688 4.52923 7.62232 4.51087 7.64185 4.44424L7.75665 4.05256C7.8269 3.81241 7.8881 3.60318 7.97375 3.41617C8.31209 2.67736 8.93808 2.16432 9.66147 2.03297C9.84457 1.99972 10.0385 1.99986 10.2611 2.00002H13.7391C13.9617 1.99986 14.1556 1.99972 14.3387 2.03297C15.0621 2.16432 15.6881 2.67736 16.0264 3.41617C16.1121 3.60318 16.1733 3.81241 16.2435 4.05256L16.3583 4.44424C16.3778 4.51087 16.3833 4.52923 16.388 4.54412C16.5682 5.11033 17.1278 5.49353 17.6571 5.50879H20.2286C20.6546 5.50879 21 5.90152 21 6.38597C21 6.87043 20.6546 7.26316 20.2286 7.26316H3.77143C3.34538 7.26316 3 6.87043 3 6.38597Z"
                        fill="#EF4444"
                      ></path>{" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.5956 22.0001H12.4044C15.1871 22.0001 16.5785 22.0001 17.4831 21.1142C18.3878 20.2283 18.4803 18.7751 18.6654 15.8686L18.9321 11.6807C19.0326 10.1037 19.0828 9.31524 18.6289 8.81558C18.1751 8.31592 17.4087 8.31592 15.876 8.31592H8.12404C6.59127 8.31592 5.82488 8.31592 5.37105 8.81558C4.91722 9.31524 4.96744 10.1037 5.06788 11.6807L5.33459 15.8686C5.5197 18.7751 5.61225 20.2283 6.51689 21.1142C7.42153 22.0001 8.81289 22.0001 11.5956 22.0001ZM10.2463 12.1886C10.2051 11.7548 9.83753 11.4382 9.42537 11.4816C9.01321 11.525 8.71251 11.9119 8.75372 12.3457L9.25372 17.6089C9.29494 18.0427 9.66247 18.3593 10.0746 18.3159C10.4868 18.2725 10.7875 17.8856 10.7463 17.4518L10.2463 12.1886ZM14.5746 11.4816C14.9868 11.525 15.2875 11.9119 15.2463 12.3457L14.7463 17.6089C14.7051 18.0427 14.3375 18.3593 13.9254 18.3159C13.5132 18.2725 13.2125 17.8856 13.2537 17.4518L13.7537 12.1886C13.7949 11.7548 14.1625 11.4382 14.5746 11.4816Z"
                        fill="#EF4444"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
              </div>
            ))
          ) : (
            <div>No Codes Available</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
