import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";

//types
import { TFetchRoomStudents, TRoomDetails } from "../types/Rooms.types";

//components
import ErrorMessage from "../components/ErrorMessage";
import { SuccessResponse } from "../types/Response.types";
import SuccessMessage from "../components/SuccessMessage";

//assets
import girlSvg from "../assets/rooms/girl.svg";
import boySvg from "../assets/rooms/boy.svg";
import gradeSvg from "../assets/rooms/grade.svg";
import refreshSvg from "../assets/rooms/refresh.svg";
//utils
import { getRole } from "../utils/getRole";

const RoomDetails = () => {
  const { token } = useSelector((state: RootState) => state.authReducer);
  const { roomId } = useParams();
  //States
  const [room, setRoom] = useState<TRoomDetails | null>(null);
  const [students, setStudents] = useState<TFetchRoomStudents[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<TFetchRoomStudents | null>(null);
  const [gradedStudent, setGradedStudent] = useState<TFetchRoomStudents | null>(null);
  const [grade, setGrade] = useState<string>("0");
  const [role, setRole] = useState<string | null>(null);
  const [response, setResponse] = useState<SuccessResponse | null>(null);
  const [removePopUp, setRemovePopUp] = useState<TFetchRoomStudents | null>(null);
  useEffect(() => {
    if (token) {
      fetchRoomDetails();
      fetchRoomsStudent();
      setRole(getRole(token));
    }
  }, [token]);

  useEffect(() => console.log(removePopUp), [removePopUp])
  const fetchRoomDetails = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_URL}/api/room/fetch-rooms/${roomId}`,
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
      }

      const data = await res.json();
      setRoom(data);
      console.log("ROom Data : ", data);
    } catch (err) {
      console.error(err);
      setRoom(null);
    }
  };

  const fetchRoomsStudent = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_URL}/api/room/fetch-students/${roomId}`, {
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

  const gradeStudent = (student: TFetchRoomStudents) => {
    setGradedStudent(student)
  }

  const submitGrade = async () => {
    try {
      if (!parseInt(grade)) {
        setResponse({
          success: false,
          message: "Please enter a valid grade",
          field: "grade"
        })
        return;
      }

      const parsedGrade = parseInt(grade);
      if (parsedGrade > 100 || parsedGrade < 0) {
        setResponse({
          success: false,
          message: "Limit exceeds grade cap",
          field: "grade"
        })
        return;
      }
      if (gradedStudent == null) {
        setResponse({
          success: false,
          message: "student is null",
          field: grade
        })
        return;
      }
      if (roomId == undefined) {
        setResponse({
          success: false,
          message: "Invalid room Id",
          field: grade
        })
        return;
      }
      const payload = {
        studentId: gradedStudent.studentId,
        grade: parsedGrade,
        roomId: parseInt(roomId)
      }
      const res = await fetch(`${import.meta.env.VITE_URL}/api/grades/grade-student`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(payload)
      })

      const data = await res.json();
      setResponse({
        success: data.success,
        message: data.message,
        field: "grade"
      })
    } catch (err) {
      console.error(err);
      return;
    }
  }

  const removeStudent = async() => {
    try{
      const res = await fetch(`${import.meta.env.VITE_URL}/api/`)
    }catch(err) {
      console.error(err);
      return;
    }
  }


  if (room == null) {
    return (
      <div className="grow mb-10 px-4 lg:px-12 text-center text-2xl font-bold mt-20">404 Not Found</div>
    )
  }

  return (
    <div className={`grow flex gap-10 mb-10 mt-20 px-6 `}>
      <div className={`${gradedStudent != null || removePopUp != null ? "blur-sm" : "blur-0"} grow relative flex gap-10`}>
        <div className="grow">
          <div>
            <div className="text-2xl font-bold ">

              {room
                ? room.subjectName.slice(0, 1).toUpperCase() +
                room.subjectName.slice(1, room.subjectName.length)
                : "Unknown"} -
            </div>
            <div className="text-sm text-gray-500 mb-4">View - Room</div>
          </div>


          <div className="flex items-center justify-between mt-20 mb-5 font-bold">
            <h1 className="text-xl  ">Students</h1>
            <button onClick={fetchRoomsStudent} className="flex gap-2 bg-customLightBlue rounded-md px-4 py-2 text-sm"><img src={refreshSvg} className="w-5" />Refresh</button>
          </div>
          <div className="grid gap-5">
            {students.length > 0 && students.map((student) => (
              <div key={student.id} className={`grid ${role == "student" ? "grid-cols-1" : "grid-cols-12"}`}>
                <div key={student.id} onClick={() => viewProfile(student)} className={`${role == "student" ? "rounded-md" : "rounded-l-md"} col-span-10 lg:col-span-11 bg-customBlue2  py-3 px-6 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 items-center text-xs hover:bg-customLightBlue ease-in-out duration-500`}>
                  <div className="flex gap-5 items-center">
                    <img className="w-8" src={student.userInfo.gender == "Male" ? boySvg : girlSvg} />
                    <h1>{student.userInfo.firstName + " " + student.userInfo.lastName}</h1>
                  </div>

                  <h6 className="hidden 2xl:block">{student.role.slice(0, 1).toUpperCase() + student.role.slice(1, student.role.length)}</h6>
                  <h6 className="hidden md:block">{student.email}</h6>
                  <h6 className="hidden 2xl:block">{student.userInfo.gender}</h6>
                </div>
                <div onClick={() => gradeStudent(student)} className={`${role == "student" ? "hidden" : "block"} col-span-2 lg:col-span-1 bg-customBlue2 rounded-r-md flex justify-center items-center cursor-pointer`}>
                  <img className="w-5" src={gradeSvg} />
                </div>

                {selectedStudent && selectedStudent.id == student.id && (
                  <div className="xl:hidden bg-customBlue2 col-span-12 mt-2 rounded-md p-6">
                    <div className="flex justify-center mt-5"><img className="w-20 " src={selectedStudent.userInfo.gender == "Male" ? boySvg : girlSvg} /></div>
                    <div className="text-center font-bold mt-2 mb-5">{selectedStudent.userInfo.firstName + " " + selectedStudent.userInfo.lastName}</div>

                    <div className="text-xs grid gap-5">

                      <div>
                        <h3 className="font-bold">Age</h3>
                        <h3 className="text-gray-500">{selectedStudent.userInfo.age}</h3>
                      </div>

                      <div>
                        <h3 className="font-bold">Gender</h3>
                        <h3 className="text-gray-500">{selectedStudent.userInfo.gender}</h3>
                      </div>

                      <div>
                        <h3 className="font-bold">Email</h3>
                        <h3 className="text-gray-500">{selectedStudent.email}</h3>
                      </div>

                      <div>
                        <h3 className="font-bold">Phone</h3>
                        <h3 className="text-gray-500">{selectedStudent.userInfo.phone}</h3>
                      </div>

                      <div>
                        <h3 className="font-bold">Country</h3>
                        <h3 className="text-gray-500">{selectedStudent.userInfo.country}</h3>
                      </div>
                      <div>
                        <h3 className="font-bold">City</h3>
                        <h3 className="text-gray-500">{selectedStudent.userInfo.city}</h3>
                      </div>
                      <div>
                        <h3 className="font-bold">State</h3>
                        <h3 className="text-gray-500">{selectedStudent.userInfo.state}</h3>
                      </div>
                      <div className="flex justify-end mt-10 text-xs">
                        <div className="grid grid-cols-2 gap-5 w-52">
                          <button onClick={() => setSelectedStudent(null)} className="border-2 border-customLightBlue py-2 rounded-md ">Close</button>
                          <button onClick={() => setRemovePopUp(selectedStudent)} className="bg-red-500 py-2 rounded-md">Remove</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

          </div>


        </div>
        {selectedStudent && (
          <div className="sticky p-12 w-96 bg-customBlue2 rounded-md lg:hidden hidden xl:block">
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
                  <h3 className="text-gray-500">{selectedStudent.userInfo.age}</h3>

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
              <div className="grid grid-cols-2 gap-5 mt-20">
                <button onClick={() => setSelectedStudent(null)} className="border-2 border-customLightBlue py-3 rounded-md ">Close</button>
                <button onClick={() => setRemovePopUp(selectedStudent)} className="bg-red-500 py-3 rounded-md">Remove</button>
              </div>
            </div>

          </div>
        )}
      </div>

      {removePopUp && (
        <div className="fixed z-10 left-[15%] lg:left-[45%]  top-30 bg-customBlue2  p-8 rounded-md backdrop-blur-3xl">
          <div>Are you sure you want to remove <span className="block text-center font-bold">{removePopUp.userInfo.firstName + " " + removePopUp.userInfo.lastName}{" "} <span className="font-normal">?</span></span></div>

          <div className="flex justify-end mt-10 text-sm font-semibold">
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setRemovePopUp(null)} className="border-2 border-customLightBlue  px-4 rounded-md">Cancel</button>
              <button onClick={() => removeStudent(removePopUp.studentId)} className="bg-red-500 py-3 px-4 rounded-md">Remove</button>
            </div>
          </div>
        </div>
      )}

      {gradedStudent && (
        <div className="fixed z-10 left-[45%] top-30 bg-customBlue2  p-8 rounded-md backdrop-blur-3xl">
          <div>
            <h1 className="text-xl font-bold rounded-md mb-2">Grade Student</h1>
            <h3>{gradedStudent.userInfo.firstName + " " + gradedStudent.userInfo.lastName}</h3>
          </div>

          <div>
            <input type="number" max={100} value={grade} onChange={(e) => setGrade(e.target.value)} className="bg-customBlue px-3 py-2 rounded-md" placeholder="0 / 100" />

            <div className="w-full flex justify-end gap-3 text-sm mt-5">
              <button onClick={() => setGradedStudent(null)} className="w-24 py-2 rounded-md border-2 border-customLightBlue">Close</button>
              <button onClick={submitGrade} className="w-24 py-2 rounded-md bg-customLightBlue border-2 border-customLightBlue">Save</button>
            </div>
          </div>
          <div className="mt-5">
            <ErrorMessage fieldName="grade" response={response} />
            <SuccessMessage fieldName="grade" response={response} />
          </div>
        </div>
      )}

    </div>
  );
};

export default RoomDetails;
