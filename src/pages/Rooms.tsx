import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { RoomType } from "../types/Rooms.types";
import { RoomResponse } from "../types/Response.types";
import { useNavigate } from "react-router-dom";

function Sections() {
  const token = useSelector((state: RootState) => state.authReducer.token);
  const navigate = useNavigate();

  // States
  const [rooms, setRooms] = useState<RoomType[]>();
  const [roomName, setRoomName] = useState<string>("");
  const [roomResponse, setRoomResponse] = useState<RoomResponse | null>(null);
  const [refresh, setRefresh] = useState<boolean>(false);

  //Fetch Rooms List
  useEffect(() => {
    if (token) {
      fetchRooms();
    }
  }, [refresh]);

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
      setRooms(data);
      console.log(data);
    } catch (error) {
      console.error(error);
      return;
    }
  };

  //Create room
  const createRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("room input :", roomName);
      const res = await fetch(
        `${import.meta.env.VITE_URL}/api/room/create-room`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ roomName: roomName }),
        }
      );
      const data = await res.json();
      console.log(data);
      setRoomResponse({
        success: data.success,
        message: data.message,
      });
      setRefresh(!refresh);
    } catch (error) {
      console.error(error);
      return;
    }
  };

  //View room details
  const viewRoomDetails = (id: number) => {
    navigate(`/rooms/${id}`);
  };

  return (
    <div className="grow mb-10 mt-20 px-12">
      <div className="text-2xl font-bold ">Room Creation</div>
      <div className="text-sm text-gray-500 mb-4">Room - Create Room</div>

      {/* Room Creation */}
      <div className="flex justify-end mb-5">
        <form onSubmit={createRoom} className="bg-customBlue2 rounded-md p-6">
          <div className="text-sm">
            <div className="">
              <label>Room Name</label>
              <input
                type="text"
                value={roomName}
                onChange={(e) => {
                  setRoomName(e.target.value);
                  setRoomResponse(null);
                }}
                className="block bg-customBlue rounded-md outline-none py-1 px-2 mb-4"
              />
            </div>
          </div>
          <div className="">
            <div className="bg-customLightBlue  flex justify-center items-center gap-3 text-sm p-2  rounded-lg">
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
              <button type="submit" className="hidden md:block">
                Create Room
              </button>
            </div>
          </div>

          {roomResponse?.success == true && (
            <div className="flex items-center justify-center text-sm mt-5 gap-2 text-[#928EF2]">
              <svg
                className="w-5"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
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
                    fill="#928EF2"
                    fillRule="evenodd"
                    d="M3 10a7 7 0 019.307-6.611 1 1 0 00.658-1.889 9 9 0 105.98 7.501 1 1 0 00-1.988.22A7 7 0 113 10zm14.75-5.338a1 1 0 00-1.5-1.324l-6.435 7.28-3.183-2.593a1 1 0 00-1.264 1.55l3.929 3.2a1 1 0 001.38-.113l7.072-8z"
                  ></path>{" "}
                </g>
              </svg>
              <div className="text-center">{roomResponse.message}</div>
            </div>
          )}
          {roomResponse?.success == false && (
            <div className="flex items-center justify-center text-sm mt-5 gap-2 text-red-500">
              <svg
                className="w-5"
                viewBox="0 0 512 512"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                fill="#EF4444"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <g
                    id="add"
                    fill="#EF4444"
                    transform="translate(42.666667, 42.666667)"
                  >
                    <path d="M213.333333,3.55271368e-14 C331.136,3.55271368e-14 426.666667,95.5306667 426.666667,213.333333 C426.666667,331.136 331.136,426.666667 213.333333,426.666667 C95.5306667,426.666667 3.55271368e-14,331.136 3.55271368e-14,213.333333 C3.55271368e-14,95.5306667 95.5306667,3.55271368e-14 213.333333,3.55271368e-14 Z M262.250667,134.250667 L213.333333,183.168 L164.416,134.250667 L134.250667,164.416 L183.168,213.333333 L134.250667,262.250667 L164.416,292.416 L213.333333,243.498667 L262.250667,292.416 L292.416,262.250667 L243.498667,213.333333 L292.416,164.416 L262.250667,134.250667 Z" />
                  </g>
                </g>
              </svg>
              <div className="text-center">{roomResponse?.message}</div>
            </div>
          )}
        </form>
      </div>

      {/* Fetch Rooms */}
      <div className="">
        {rooms && rooms?.length <= 0 ? (
          <div className="bg-customBlue2 rounded-md p-6">
            No rooms available.
          </div>
        ) : (
          rooms?.map((room) => (
            <div key={room.id} className="bg-customBlue2 mb-4 p-6 rounded-md">
              <div className="text-xl font-bold">
                {room.subjectName.slice(0, 1).toUpperCase() +
                  room.subjectName.slice(1, room.subjectName.length)}
              </div>

              <div className="flex justify-end">
                <div
                  onClick={() => viewRoomDetails(room.id)}
                  className="bg-customLightBlue px-4 py-2 text-sm rounded-md"
                >
                  View
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Sections;
