import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { RoomType, TFetchRoomsNonAdmin } from "../types/Rooms.types";
import { RoomResponse } from "../types/Response.types";
import { useNavigate } from "react-router-dom";
import { getRole } from "../utils/getRole";
import addSvg from "../assets/rooms/add.svg";
import checkSvg from "../assets/rooms/check.svg";
import crossSvg from "../assets/rooms/cross.svg";
import refreshSvg from "../assets/rooms/refresh.svg"
function Sections() {
  const token = useSelector((state: RootState) => state.authReducer.token);
  if (!token) {
    return null;
  }
  const navigate = useNavigate();
  // States
  const [rooms, setRooms] = useState<RoomType[]>();
  const [nonAdminRooms, setNonAdminRooms] = useState<TFetchRoomsNonAdmin[]>();
  const [roomName, setRoomName] = useState<string>("");
  const [roomResponse, setRoomResponse] = useState<RoomResponse | null>(null);
  const [joinRoom, setJoinRoom] = useState<string>("");
  const [joinRoomResponse, setJoinRoomResponse] = useState<RoomResponse | null>(null);
  const [togglePopUp, setTogglePopUp] = useState<RoomType | null>(null);
  //DECODE USER TOKEN TO GET USER ROLE;
  const role = getRole(token);
  //Fetch Rooms List

  useEffect(() => {
    if (token) {
      fetchRooms();
    }
  }, [token]);

  useEffect(() => {
    console.log("ROOMZZ : ", rooms);
  }, [rooms]);

  const fetchRooms = async () => {
    try {
      console.log("executing fetch rooms");
      const res = await fetch(
        `${import.meta.env.VITE_URL}/api/room/fetch-rooms?role=${role}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        },
      );
      console.log("finished fetching from backend")
      const data = await res.json();
      console.log(data);
      if (role == "admin" || role == "teacher") {
        setRooms(data);
      } else {
        setNonAdminRooms(data);
      }


      console.log("fetching resource");
      return;
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
      console.log(data);
      setRoomResponse({
        success: data.success,
        message: data.message,
      });
      if (data.success === true) {
        setRooms((prevRooms) => [data.room, ...(prevRooms || [])]);
      }
      setRoomName("");
      return;
    } catch (error) {
      console.error(error);
      return;
    }
  };

  //View room details
  const viewRoomDetails = (id: number) => {
    navigate(`/rooms/${id}`);
  };

  const submitJoinRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_URL}/api/room/join-room`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(joinRoom)
      }
      )

      const data = await res.json();
      setJoinRoomResponse(data);
      if (data.success === true) {
        fetchRooms();
      }
      console.log(data);
    } catch (err) {
      console.error(err);
      return;
    }
  }

  const deleteRoom = async (roomId: number) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_URL}/api/room/delete-room?roomId=${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json"
        },
        method: "DELETE"
      });

      const data = await res.json();
      console.log(data);
      return;
    } catch (err) {
      console.error(err);
      return;
    } finally {
      setTogglePopUp(null);
      fetchRooms();
    }
  }

  return (
    <div className={`grow  relative mb-10 mt-20 px-12`}>
      <div className={`${togglePopUp ? "blur-sm" : "blur-none"}`}>
        <div className="text-2xl font-bold ">{role == "admin" ? "Room Creation" : "View Rooms"}</div>
        <div className="text-sm text-gray-500 mb-4">{role == "admin" ? "Room - Create Room" : "Room - View Rooms"}</div>
        {role == "admin" && (

          <div className="flex justify-end mb-5">
            <form onSubmit={createRoom} className="w-full sm:w-1/2 text-sm lg:w-[400px] bg-customBlue2  rounded-md p-6">
              <div className="text-sm">
                <div className="">
                  <label>Room Name : </label>
                  <input
                    type="text"
                    value={roomName}
                    onChange={(e) => {
                      setRoomName(e.target.value);
                      setRoomResponse(null);
                    }}
                    className="w-full block bg-customBlue rounded-md outline-none py-1 px-2 "
                  />
                </div>
              </div>
              <div className="">
                <button className="bg-customLightBlue w-full flex justify-center items-center gap-3 text-sm p-2  rounded-lg mt-2">
                  <img src={addSvg} className="w-[20px] h-[20px]" />
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
            <form className="w-full sm:w-1/2 text-sm lg:w-[400px] bg-customBlue2 rounded-md p-6 " onSubmit={submitJoinRoom}>
              <label className="text-sm">Join Room : </label>
              <input type="text"
                value={joinRoom}
                onChange={(e) => setJoinRoom(e.target.value)}
                className="block w-full bg-customBlue rounded-md outline-none py-1 px-2"
              />

              <button className="bg-customLightBlue w-full flex justify-center items-center gap-3 text-sm p-2  rounded-md mt-2">
                Join Room
              </button>

              {joinRoomResponse?.success == true && (
                <div className="flex items-center justify-center text-sm mt-5 gap-2 text-[#928EF2]">
                  <img src={checkSvg} className="w-5" />
                  <div className="text-center w-[80%]">{joinRoomResponse.message}</div>
                </div>
              )}
              {joinRoomResponse?.success == false && (
                <div className=" flex items-center justify-center text-sm mt-5 gap-2 text-red-500">
                  <img src={crossSvg} className="w-5" />
                  <div className="text-center">{joinRoomResponse?.message}</div>
                </div>
              )}
            </form>
          </div>
        )}

        <div className="flex justify-end">

          <button onClick={() => fetchRooms()} className="flex gap-2 bg-customLightBlue rounded-md px-4 py-2 text-sm mb-5 mt-5"><img src={refreshSvg} className="w-4" />Refresh</button>
        </div>

        {/* Fetch Rooms */}

        {(role == "admin" || role == "teacher") && rooms && (

          <div className="h-[1500px]">
            {rooms && rooms?.length <= 0 ? (
              <div className="bg-customBlue2 rounded-md p-6">
                No rooms available.
              </div>
            ) : (
              rooms?.map((room) => (
                <div
                  key={room.id}
                  className="bg-customBlue2 mb-4 p-6 rounded-md "
                >
                  <div className="flex items-center gap-2">
                    <div className="text-xl font-bold">
                      {room.subjectName.slice(0, 1).toUpperCase() +
                        room.subjectName.slice(1, room.subjectName.length)}
                    </div>
                    <div> - </div>
                    <div className="text-sm text-gray-500">
                      {room.teacherName ? room.teacherName : "No teacher available"}
                    </div>
                  </div>

                  <div>Room Code : {room.roomCode}</div>
                  <div className="flex items-center text-sm justify-end">
                    <div className="grid grid-cols-2 gap-2">
                      <div onClick={() => setTogglePopUp(room)} className="bg-red-500 rounded-md py-2 px-4 flex items-center justify-center cursor-pointer">Delete</div>
                      <div
                        onClick={() => viewRoomDetails(room.id)}
                        className="bg-customLightBlue flex items-center px-4 justify-center rounded-md cursor-pointer"
                      >
                        View
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {role == "student" && (

          <div className="">
            {nonAdminRooms && nonAdminRooms.length <= 0 ? (
              <div className="bg-customBlue2 rounded-md p-6">
                No rooms available.
              </div>
            ) : (
              nonAdminRooms?.map((room) => (
                <div
                  key={room.roomId}
                  className="bg-customBlue2 mb-4 p-6 rounded-md cursor-pointer "
                >
                  <div className="flex items-center gap-2">
                    <div className="text-xl font-bold">
                      {room.room.subjectName.slice(0, 1).toUpperCase() +
                        room.room.subjectName.slice(1, room.room.subjectName.length)}
                    </div>
                    {room.room.teacherName && (
                      <div>

                        <div> - </div>
                        <div className="text-sm text-gray-500">
                          {room.room.teacherName ? room.room.teacherName : "No teacher available"}
                        </div>
                      </div>
                    )}
                  </div>
                  <div>Room Code : <span className="">{room.room.roomCode}</span></div>

                  <div className="flex justify-end">
                    <div
                      onClick={() => viewRoomDetails(room.roomId)}
                      className="bg-customLightBlue px-4 py-2 text-sm rounded-md"
                    >
                      View
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      {togglePopUp && (
        <div className="fixed top-10 left-[45%] bg-customBlue2 p-6 w-[350px] rounded-md">
          <div className="text-center">Are you sure you want to delete <span className="font-bold block text-center">{togglePopUp.subjectName} ?</span></div>
          <div className="mt-10 flex justify-end">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <button onClick={() => setTogglePopUp(null)} className="px-6 border-2 border-customLightBlue rounded-md py-2">Close</button>
              <button onClick={() => deleteRoom(togglePopUp.id)} className="px-6 bg-red-500 rounded-md py-2">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sections;
