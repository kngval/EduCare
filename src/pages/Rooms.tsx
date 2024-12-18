import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { RoomType } from "../types/Rooms.types";
import { RoomResponse } from "../types/Response.types";
import { useNavigate } from "react-router-dom";
import { getRole } from "../utils/getRole";
import addSvg from "../assets/rooms/add.svg";
import checkSvg from "../assets/rooms/check.svg";
import crossSvg from "../assets/rooms/cross.svg";
function Sections() {
  const token = useSelector((state: RootState) => state.authReducer.token);
  if (!token) {
    return null;
  }
  const navigate = useNavigate();

  // States
  const [rooms, setRooms] = useState<RoomType[]>();
  const [roomName, setRoomName] = useState<string>("");
  const [roomResponse, setRoomResponse] = useState<RoomResponse | null>(null);


  const [joinRoom, setJoinRoom] = useState<string>("");
  const role = getRole(token);
  //Fetch Rooms List
  useEffect(() => {
    if (token) {
      fetchRooms();
      console.log(role);
    }
  }, [token]);

  const fetchRooms = async () => {
    try {
      console.log("executing fetch rooms");
      const res = await fetch(
        `${import.meta.env.VITE_URL}/api/room/fetch-rooms${role == "admin" ? `/admin?role=${role}` : ""}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        },
      );
      const data = await res.json();

      setRooms(data);

      console.log("fetching resource");
    } catch (error) {
      console.error(error);
      return;
    }
  };

  //Create room
  const createRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_URL}/api/room/create-room`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ roomName: roomName }),
        },
      );
      const data = await res.json();
      setRoomResponse({
        success: data.success,
        message: data.message,
      });
      setRoomName("");
      fetchRooms();
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

      <div className="text-2xl font-bold ">{role == "admin" ? "Room Creation" : "View Rooms"}</div>
      <div className="text-sm text-gray-500 mb-4">{role == "admin" ? "Room - Create Room" : "Room - View Rooms"}</div>
      {role == "admin" && (

        <div className="flex justify-center mb-5">
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
              <button className="bg-customLightBlue w-full flex justify-center items-center gap-3 text-sm p-2  rounded-lg">
                <img src={addSvg} className="w-[20px] h-[25px]" />
                Create Room
              </button>
            </div>

            {roomResponse?.success == true && (
              <div className="flex items-center justify-center text-sm mt-5 gap-2 text-[#928EF2]">
                <img src={checkSvg} className="w-5" />
                <div className="text-center">{roomResponse.message}</div>
              </div>
            )}
            {roomResponse?.success == false && (
              <div className="flex items-center justify-center text-sm mt-5 gap-2 text-red-500">
                <img src={crossSvg} className="w-5" />
                <div className="text-center">{roomResponse?.message}</div>
              </div>
            )}
          </form>
        </div>
      )}

      {/*USER FORM IF NOT AN ADMIN (JOIN ROOM ONLY)*/}
      {role != "admin" && (
        <div className="flex justify-end mb-5">
          <form className="bg-customBlue2 rounded-md p-6">
            <label>Join Room : </label>
            <input type="text"
              value={joinRoom}
              onChange={(e) => setJoinRoom(e.target.value)}
              className="block bg-customBlue rounded-md outline-none py-1 px-2"
            />
          </form>
        </div>
      )}
      {/* Room Creation */}

      {/* Fetch Rooms */}
      <div className="">
        {rooms && rooms?.length <= 0 ? (
          <div className="bg-customBlue2 rounded-md p-6">
            No rooms available.
          </div>
        ) : (
          rooms?.map((room) => (
            <div
              key={room.id}
              className="bg-customBlue2 mb-4 p-6 rounded-md cursor-pointer"
            >
              <div className="text-xl font-bold">
                {room.subjectName.slice(0, 1).toUpperCase() +
                  room.subjectName.slice(1, room.subjectName.length)}
              </div>
              <div className="text-sm text-gray-500">
                {room.teacherName ? room.teacherName : "No teacher available"}
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
