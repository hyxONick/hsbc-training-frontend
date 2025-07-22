import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div className="p-6 max-w-md mx-auto mt-20 bg-white shadow rounded text-center">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user.username}</h2>
      <p className="mb-4">Role: {user.role}</p>
      <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
    </div>
  )
}
