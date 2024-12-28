import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { TFetchRoomStudents, TRoomDetails } from "../types/Rooms.types";
import girlSvg from "../assets/rooms/girl.svg";
import boySvg from "../assets/rooms/boy.svg";
import gradeSvg from "../assets/rooms/grade.svg";

const RoomDetails = () => {
  const { id } = useParams();
  const { token } = useSelector((state: RootState) => state.authReducer);
  //States
  const [room, setRoom] = useState<TRoomDetails | null>(null);
  const [students, setStudents] = useState<TFetchRoomStudents[]>();
  const [selectedStudent, setSelectedStudent] = useState<TFetchRoomStudents | null>(null);
  useEffect(() => {
    if (token) {
      fetchRoomDetails();
      fetchRoomsStudent();
    }
  }, []);

  useEffect(() => {
    console.log(room);
  }, [room])

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

  const fetchRoomsStudent = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_URL}/api/room/fetch-students/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json"
        },
        method: "GET",
      });

      // Check if response is OK

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setStudents(data);
      }

    } catch (err) {
      console.error(err);
      return;
    }
  }

  const viewProfile = (student: TFetchRoomStudents) => {
    setSelectedStudent(student);
  }

  useEffect(() => console.log(selectedStudent), [selectedStudent]);

  useEffect(() => console.log(room), [room])

  if (room == null) {
    return (
      <div className="grow mb-10 px-12 text-center text-2xl font-bold mt-20">404 Not Found</div>
    )
  }

  return (
    <div className="grow flex gap-10 mb-10 mt-20 px-12">
      <div className="grow">
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

        <div className="text-xl font-bold mt-20 mb-2 ">Students</div>
        <div className="grid gap-5">
          {students && students.length > 0 && students.map((student) => (
            <div key={student.id} onClick={() => viewProfile(student)} className="bg-customBlue2 rounded-md py-3 px-6 grid grid-cols-5 items-center text-xs hover:bg-customLightBlue ease-in-out duration-500">
              <div className="flex gap-5 items-center">
                <img className="w-8" src={student.userInfo.gender == "Male" ? boySvg : girlSvg} />
                <h1>{student.userInfo.firstName + " " + student.userInfo.lastName}</h1>
              </div>
              <h6 className="">{student.role.slice(0, 1).toUpperCase() + student.role.slice(1, student.role.length)}</h6>

              <h6 className="">{student.email}</h6>
              <h6 className="">{student.userInfo.gender}</h6>
              <button className="w-16 justify-self-end"><img className="w-5" src={gradeSvg} /></button>
            </div>
          ))}

        </div>
      </div>
      {selectedStudent && (
        <div className="sticky p-12 w-96 bg-customBlue2 rounded-md">
          <div className="flex justify-center">
            <img className="w-36 mb-5" src={selectedStudent.userInfo.gender == "Male" ? boySvg : girlSvg} />
          </div>
          <div className="text-xl text-center font-bold">
            <h1>{selectedStudent.userInfo.firstName + " " + selectedStudent.userInfo.lastName}</h1>
            <h3 className="text-sm text-gray-500">{selectedStudent.role.slice(0, 1).toUpperCase() + selectedStudent.role.slice(1, selectedStudent.role.length)}</h3>
          </div>

          <div className="mt-20 grid gap-10 text-sm">
            <div>
              <h1 className="font-bold">Email</h1>
              <h3 className="text-gray-500">{selectedStudent.email}</h3>
            </div>

            <div>
              <h1 className="font-bold">Phone</h1>
              <h3 className="text-gray-500">{selectedStudent.userInfo.phone}</h3>
            </div>

            <div className="flex justify-between">
              <div>
                <h1 className="font-bold">Age</h1>
                <h3 className="text-gray-500">20</h3>

              </div>

              <div>
                <h1 className="font-bold">Gender</h1>
                <h3 className="text-gray-500">{selectedStudent.userInfo.gender}</h3>
              </div>
            </div>

            <div className="flex justify-between">
              <div>
                <h1 className="font-bold">Country</h1>
                <h3 className="text-gray-500">{selectedStudent.userInfo.country}</h3>

              </div>

              <div>
                <h1 className="font-bold">City</h1>
                <h3 className="text-gray-500">{selectedStudent.userInfo.city}</h3>
              </div>
              <div>
                <h1 className="font-bold">State</h1>
                <h3 className="text-gray-500">{selectedStudent.userInfo.state}</h3>
              </div>

            </div>

          </div>

        </div>
      )}
    </div>
  );
};

export default RoomDetails;
