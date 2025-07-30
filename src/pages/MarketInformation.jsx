import React, { useState } from "react"
import {
  Search, Bell, LayoutDashboard, FileText, TrendingUp,
  Briefcase, Globe, Settings
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "/src/components/ui/avatar"
import { Button } from "/src/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "/src/components/ui/card"
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, LineChart, Line, Cell
} from "recharts"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

import {
  riseFallDistribution, globalIndices, stockQuotes, calculateMarketRating
} from "../constants/marketInformationData"

import { allAssets } from "../constants/marketInformationData"

const getYAxisDomain = (data) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const padding = (max - min) * 0.3;
  return [min - padding, max + padding];
};

const marketRating = calculateMarketRating(riseFallDistribution.histogram)
const user = JSON.parse(localStorage.getItem("user"))

export default function MarketInformation() {
  const [page, setPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(allAssets.length / itemsPerPage)
  const paginatedAssets = allAssets.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-xl font-bold text-blue-600">Portfolio Manager</div>
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
            <a href="/profit-analysis" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
              <TrendingUp className="h-4 w-4" /><span>Profit Analysis</span>
            </a>
            <a href="/portfolio-detail" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
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

            {/* Market Snapshot */}
            <Card>
              <CardHeader><CardTitle>Market Snapshot</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Histogram */}
                  <div className="h-72 col-span-12 md:col-span-8">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={riseFallDistribution.histogram}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="range" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count">
                          {riseFallDistribution.histogram.map((entry, index) => (
                            <Cell
                              key={index}
                              fill={/^[-]/.test(entry.range) || entry.range === "Lim Down" ? "#EF4444" : "#10B981"}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Market Rating */}
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

            {/* Index & Stock Side by Side */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Index Trends - Left */}
              <div className="w-full lg:w-1/2">
                <Card>
                  <CardHeader><CardTitle>Index Trends</CardTitle></CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            <YAxis domain={getYAxisDomain(index.trend)} hide={true} />
                            <Line type="linear" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
                            <Tooltip />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
              <div className="w-full lg:w-1/2">
              <Card>
                <CardHeader><CardTitle>Stock Quotes</CardTitle></CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Symbol</th>
                          <th className="px-3 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
                          <th className="px-3 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Price</th>
                          <th className="px-3 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Change%</th>
                          <th className="px-3 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Change</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {stockQuotes.map((stock, i) => (
                          <tr key={i} className="hover:bg-gray-50">
                            <td className="px-3 py-2 text-sm font-medium text-gray-900">{stock.symbol}</td>
                            <td className="px-3 py-2 text-sm text-gray-500">{stock.name}</td>
                            <td className="px-3 py-2 text-sm text-gray-900">${stock.price.toFixed(2)}</td>
                            <td className={`px-3 py-2 text-sm ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {stock.change >= 0 ? '+' : ''}{stock.change}%
                            </td>
                            <td className={`px-3 py-2 text-sm ${stock.changeAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {stock.changeAmount >= 0 ? '+' : ''}{stock.changeAmount.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              </div>
            </div>


           <Card>
            <CardHeader><CardTitle>All Assets</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left">Symbol</th>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Type</th>
                      <th className="px-4 py-2 text-left">Price</th>
                      <th className="px-4 py-2 text-left">Change</th>
                      <th className="px-4 py-2 text-left">Change%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedAssets.map((a, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-4 py-2">{a.symbol}</td>
                        <td className="px-4 py-2">{a.name}</td>
                        <td className="px-4 py-2 capitalize">{a.type}</td>
                        <td className="px-4 py-2">${a.price.toFixed(2)}</td>
                        <td className={`px-4 py-2 ${a.changeAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {a.changeAmount >= 0 ? '+' : ''}{a.changeAmount?.toFixed(2) ?? '--'}
                        </td>
                        <td className={`px-4 py-2 ${a.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {a.change >= 0 ? '+' : ''}{a.change?.toFixed(2) ?? '--'}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination Buttons */}
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >Prev</button>
                  <span className="px-2">{page} / {totalPages}</span>
                  <button
                    className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >Next</button>
                </div>
              </div>
            </CardContent>
          </Card>


          </div>
        </main>
      </div>
    </div>
  )
}
