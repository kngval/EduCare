import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

function Sections() {
  const token = useSelector((state: RootState) => state.authReducer.token);

  useEffect(() => {
    if (token) {
      fetchRooms();
    }
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_URL}/api/room/fetch-rooms`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        }
      );
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grow mb-10 mt-20 px-12">
      <div className="bg-customBlue2 px-8">
        <div>
          <div>
            <label>Room</label>
            <input type="text" className="block bg-customBlue border-2 border-customLightBlue" />
          </div>
        </div>
        <div className=" flex justify-end px-5 ">
          <div className="bg-customLightBlue lg:w-[200px] flex justify-center items-center gap-3 text-sm p-2  rounded-lg">
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
            <button className="hidden md:block">Create Room</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sections;
