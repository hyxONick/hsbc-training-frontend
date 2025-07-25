import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'

function App() {
  const isLoggedIn = localStorage.getItem('token')

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default App
