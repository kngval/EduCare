import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { TRoomDetails } from "../types/Rooms.types";

const RoomDetails = () => {
  const { id } = useParams();
  const { token } = useSelector((state: RootState) => state.authReducer);
  //States
  const [room, setRoom] = useState<TRoomDetails | null>(null);

  useEffect(() => {
    if (token) {
      fetchRoomDetails();
    }
  }, []);

  useEffect(() => { 
    console.log(room);
  },[room])

  const fetchRoomDetails = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_URL}/api/room/fetch-rooms/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
          method: "GET",
        },
      );
      if (!res.ok) {
        setRoom(null);
        console.log(room);
      }

      const data = await res.json();
      setRoom(data);
    } catch (err) {
      console.error(err);
      setRoom(null);
    }
  };
  
  useEffect(() => console.log(room),[room])
  
  if(room == null) {
    return (
    <div className="grow mb-10 px-12 text-center text-2xl font-bold mt-20">404 Not Found</div>
    )
  }

  return (
    <div className="grow mb-10 mt-20 px-12">
      <div>
        <div className="text-2xl font-bold ">
          {room
            ? room.subjectName.slice(0, 1).toUpperCase() +
            room.subjectName.slice(1, room.subjectName.length)
            : "Unknown"}
        </div>
        <div className="text-sm text-gray-500 mb-4">View - Room</div>
      </div>

      <div className="bg-customBlue2 p-6 rounded-md">
        {room?.teacherName ? (
          <div className=" text-xl">Test</div>
        ) : (
          <div>No Teacher Available</div>
        )}
      </div>
    </div>
  );
};

export default RoomDetails;
