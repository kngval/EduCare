import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { useSelector } from "react-redux"
import { RootState } from "./redux/store"
import Dashboard from "./pages/Dashboard"

function App() {
  const token = useSelector((state: RootState) => state.authReducer.token);
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/*AUTH CHECK ROUTES*/}
          <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          <Route path="/login" element={!token ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/signup" element={!token ? <Signup /> : <Navigate to="/dashboard" />} />

          {/* Main Routes */}
          <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login"/>}/>
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
