import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import PortfolioDashboard from './pages/Dashboard'
import MarketInformation from './pages/MarketInformation'
import Settings from './pages/Settings'
import AssetDetail from './pages/AssetDetail'
import ProfitAnalysis from './pages/ProfitAnalysis'
import PortfolioDetail from './pages/PortfolioDetail'
import Kline from './pages/Kline'
import Home from './pages/Home'

function App() {
  const isLoggedIn = localStorage.getItem('token')

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<PortfolioDashboard />} />
      <Route path="/dashboard" element={isLoggedIn ? <PortfolioDashboard /> : <Navigate to="/login" />} />
      <Route path="/market-information" element={isLoggedIn ? <MarketInformation /> : <Navigate to="/login" />} />
      <Route path="/settings" element={isLoggedIn ? <Settings /> : <Navigate to="/login" />} />
      <Route path="/profit-analysis" element={isLoggedIn ? <ProfitAnalysis /> : <Navigate to="/login" />} />
      <Route path="/portfolio-detail" element={isLoggedIn ? <PortfolioDetail /> : <Navigate to="/login" />} />
      <Route path="/kline/:assetCode" element={isLoggedIn ? <Kline /> : <Navigate to="/login" />} />
    </Routes>
  )
}

export default App
