import { Avatar, AvatarFallback, AvatarImage } from "/src/components/ui/avatar"
import { Button } from "/src/components/ui/button"
import {
  Search,
  Bell,
  LayoutDashboard,
  FileText,
  TrendingUp,
  Briefcase,
  Globe,
  Settings,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "/src/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, Cell} from "recharts"
import {
    riseFallDistribution,
    globalIndices,
    stockQuotes,
    marketRating, // 别忘了加这行
} from "../constants/marketInformationData"

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'



const user = JSON.parse(localStorage.getItem("user"))

export default function MarketInformation() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-xl font-bold text-blue-600">Portfolio Manager</div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900">Overview</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Trading</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Research</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Reports</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon"><Search className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon"><Bell className="h-4 w-4" /></Button>
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src="/UserAvatarSample.png" />
                <AvatarFallback>{user?.username?.[0]?.toUpperCase() || "U"}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-gray-800">{user?.username}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-6">
          <nav className="space-y-2">
            <a href="/dashboard" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
              <LayoutDashboard className="h-4 w-4" /><span>Dashboard</span>
            </a>
            <a href="/asset-detail" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
              <FileText className="h-4 w-4" /><span>Asset Detail</span>
            </a>
            <a href="#" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
              <TrendingUp className="h-4 w-4" /><span>Profit Analysis</span>
            </a>
            <a href="#" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
              <Briefcase className="h-4 w-4" /><span>Portfolio Detail</span>
            </a>
            <a href="/market-information" className="flex items-center space-x-3 text-blue-600 bg-blue-50 p-2 rounded-lg">
              <Globe className="h-4 w-4" /><span>Market Information</span>
            </a>
            <a href="/settings" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
              <Settings className="h-4 w-4" /><span>Settings</span>
            </a>
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Market Information</h1>

            {/* Gain / Loss Distribution */}
           <Card>
            <CardHeader><CardTitle>Market Snapshot</CardTitle></CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* 左边柱状图：8列 */}
                <div className="h-72 col-span-12 md:col-span-8">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[...riseFallDistribution.histogram].reverse()}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="range" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" isAnimationActive={false}>
                            {
                                [...riseFallDistribution.histogram].reverse().map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={(() => {
                                    const match = entry.range.match(/(-?\d+\.?\d*)%?/);
                                    const from = match ? parseFloat(match[1]) : 0;
                                    return from >= 0 ? "#10B981" : "#EF4444";
                                    })()}
                                />
                                ))
                            }
                            </Bar>

                        </BarChart>
                        </ResponsiveContainer>

                </div>

                {/* 右边圆环图：4列 */}
                <div className="col-span-12 md:col-span-4 flex flex-col items-center justify-center space-y-4">
                    <div className="w-32 h-32">
                    <CircularProgressbar
                        value={marketRating.score * 20}
                        text={`${marketRating.score}`}
                        styles={buildStyles({
                        pathColor: "#10B981",
                        textColor: "#10B981",
                        trailColor: "#e5e7eb",
                        textSize: "20px"
                        })}
                    />
                    </div>
                    <p className="text-center text-sm text-gray-600">{marketRating.suggestion}</p>
                </div>
                </div>
            </CardContent>
            </Card>




            {/* Indices */}
            <Card>
                <CardHeader><CardTitle>Index Trends</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {globalIndices.map((index, i) => (
                    <div key={i} className="bg-white rounded shadow p-4">
                        <div className="flex justify-between mb-2">
                        <div>
                            <p className="text-sm font-medium">{index.name}</p>
                            <p className={`text-xs ${index.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {index.change >= 0 ? '+' : ''}{index.change}%
                            </p>
                        </div>
                        <p className="text-right font-semibold">{index.value}</p>
                        </div>
                        <ResponsiveContainer width="100%" height={80}>
                        <LineChart data={index.trend.map((val, idx) => ({ name: idx, value: val }))}>
                            <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#3b82f6" 
                            strokeWidth={2} 
                            dot={false} 
                            />
                            <Tooltip />
                        </LineChart>
                        </ResponsiveContainer>
                    </div>
                    ))}
                </CardContent>
                </Card>



            {/* Stock Highlights */}
            <Card>
              <CardHeader>
                <CardTitle>Stock Quotes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change %</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Speed</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {stockQuotes.map((stock, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{stock.symbol}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stock.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${stock.price.toFixed(2)}</td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {stock.change >= 0 ? '+' : ''}{stock.change}%
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm ${stock.changeAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {stock.changeAmount >= 0 ? '+' : ''}{stock.changeAmount.toFixed(2)}
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm ${stock.speed >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {stock.speed >= 0 ? '+' : ''}{stock.speed}%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stock.volume}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
