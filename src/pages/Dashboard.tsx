import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { TDashboard } from "../types/Dashboard.types";
import add from "../assets/rooms/add.svg"
function Dashboard() {
  const token = useSelector((state: RootState) => state.authReducer.token);

  const [toggle, setToggle] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("")
  const [message, setMessage] = useState<string>("")

  const [announcements, setAnnouncements] = useState<TDashboard[]>([]);

  useEffect(() => {
    if (token) {
      fetchAnnouncements();
    }
  }, [token]);

  useEffect(() => {
    console.log("ANNOUNCEMENTS : ", announcements)
  }, [announcements]);

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_URL}/api/dashboard/fetch-announcements`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json"
        },
        method: "GET",
      });
      const data = await res.json();
      setAnnouncements(data);
    } catch (err) {
      console.error(err);
      return;
    }
  }

  const submitAnnouncement = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const dashboardDto = {
        title: title,
        message: message
      }
      const res = await fetch(`${import.meta.env.VITE_URL}/api/dashboard/post-announcement`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(dashboardDto)
      })
      const data = await res.json();
      if (data.success === true) {
        setAnnouncements((prevAnnouncements) => [data.dashboard, ...prevAnnouncements]);
        setTitle("");
        setMessage("");
      }
      console.log(data);
    } catch (err) {
      console.error(err);
      return;
    }
  }
  return (
    <div className="grow my-20 px-12">
      <div className="text-2xl font-bold">Dashboard</div>
      <div className="text-gray-500 text-sm">View - Dashboard</div>

      <div className="flex justify-end">
        <button onClick={() => setToggle(!toggle)} className="bg-customLightBlue text-sm w-[100px] py-2 my-5 rounded-md flex justify-center items-center gap-1 mb-10">
          <img src={add} className="w-6"/>
          Create
        </button>
      </div>


      {toggle === true && (
        <div className="flex justify-center mb-52">
          <form onSubmit={submitAnnouncement} className=" w-[600px] bg-customBlue2 p-6 rounded-md text-sm">
            <div className="mb-5">
              <label className="font-bold">Title : </label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="block bg-customBlue rounded-md px-4 py-1 mt-1 w-full" type="text" />
            </div>

            <div>
              <label className="font-bold">Message : </label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="bg-customBlue rounded-md p-4 mt-1 block w-full" rows={15}>

              </textarea>

              <div className="flex justify-end mt-10 text-xs">

                <div className="grid grid-cols-2 gap-2">
                  <button type="button" onClick={() => setToggle(!toggle)} className=" px-6 py-2 rounded-md text-center border-customLightBlue border-2">
                    Close
                  </button>
                  <button type="submit" className="px-6 py-2 rounded-md text-center border-2 border-customLightBlue bg-customLightBlue">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {announcements.length > 0 && announcements && (
        <div className="grid gap-5 justify-items-center">
          {
            announcements.map((announcement) => (
              <div className="w-[900px]  text-wrap rounded-md bg-customBlue2">
                <div className="flex justify-between p-6 border-b-2">
                  <div className="text-lg font-bold">{announcement.title}</div>
                  <div className="text-lg font-bold">{announcement.date}</div>
                </div>

                <div className="p-6">
                  <p className="whitespace-pre-line">{announcement.message}</p>
                </div>
              </div>
            ))
          }
        </div>
      )}
    </div>
  )
}

export default Dashboard;
