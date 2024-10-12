import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { useSelector } from "react-redux"
import { RootState } from "./redux/store"
import Dashboard from "./pages/Dashboard"
import Navbar from "./components/Navbar"
import Sections from "./pages/Sections"
import Grades from "./pages/Grades"
import Account from "./pages/Account"

function App() {
  const token = useSelector((state: RootState) => state.authReducer.token);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/*AUTH CHECK ROUTES*/}
          <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          <Route path="/login" element={!token ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/signup" element={!token ? <Signup /> : <Navigate to="/dashboard" />} />

          {/* Main Routes */}
          <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />

          <Route path="/sections" element={token ? <Sections /> : <Navigate to="/login" />} />
          <Route path="/grades" element={token ? <Grades /> : <Navigate to="/login" />} />
          <Route path="/account" element={token ? <Account /> : <Navigate to="/login" />} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
