import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { jwtDecode } from "jwt-decode";
import { TFetchRoomStudents } from "../types/Rooms.types";

import refreshSvg from "../assets/rooms/refresh.svg";

function Grades() {
  const token = useSelector((state: RootState) => state.authReducer.token);
  if (!token) {
    return null;
  }

  const [grades, setGrades] = useState<TFetchRoomStudents[]>([]);
  const studentId = jwtDecode(token);
  useEffect(() => {
    fetchGrades();
  }, [])

  const fetchGrades = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_URL}/api/grades/fetch-grades?studentId=${studentId.sub}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json"
        },
        method: "GET"
      })
      const data = await res.json();
      setGrades(data);
      console.log(data);
    } catch (err) {
      console.error(err);
      return;
    }
  }
  return (
    <div className="grow  px-6 lg:px-12 mt-20">
      <div className="mb-20">
        <h1 className="font-bold text-2xl">Grades</h1>
        <h3 className="text-sm text-gray-500">Grades - View Grades</h3>
      </div>
      <div className="mb-5 flex justify-end">

        <button onClick={fetchGrades} className="flex gap-2 bg-customLightBlue rounded-md px-4 py-2 text-sm"><img src={refreshSvg} className="w-5" />Refresh</button>
      </div>
      {/*GRADES VIEW HERE*/}
      {(grades.length <= 0) ? (

        <div className="bg-customBlue2 text-xl font-bold text-center p-8 rounded-md">
          No Grades Available
        </div>
      ) : (
        <div className="grid gap-5">
          {grades.map((grade) => (
            <div key={grade.id} className="bg-customBlue2 p-6 rounded-md">
              <div className="flex justify-between items-center">
                <div className="text-lg font-bold flex gap-2 items-center">
                  {grade.room.subjectName}
                  {grade.room.teacherName && (
                    <div className="flex items-center gap-2">
                      {" - "}
                      <span className="text-gray-500">{grade.room.teacherName}</span>
                    </div>
                  )}
                </div>

                <div className="status ">
                  {grade.grade != null ? (
                    <div className="font-bold text-sm flex items-center gap-2 ">
                      <div className={`w-3 h-3 rounded-full ${grade.grade > 75 ? "bg-green-500" : "bg-red-500"}`}></div>
                      <div>{grade.grade && grade.grade > 75 ? "Passed" : "Failed"}</div>
                    </div>
                  ) : (<div></div>)}
                </div>
              </div>
              {grade.grade != null && (

                <div className="text-xl font-bold mt-5 text-end">{grade.grade} / 100</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Grades;
