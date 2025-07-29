import { useState, useEffect} from "react"
import { Card, CardContent, CardHeader, CardTitle } from "/src/components/ui/card"
import { Button } from "/src/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "/src/components/ui/avatar"
import {
  Settings,
  Bell,
  Search,
  LayoutDashboard,
  FileText,
  TrendingUp,
  Briefcase,
  DollarSign,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Globe,
} from "lucide-react"
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts"
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts"

const user = JSON.parse(localStorage.getItem('user'))

import {
  assetData,
  profitTrendData,
  stockData,
  bondData,
  marketData,
  COLORS
} from "../constants/dashboardData"

import { dashboardData} from "../constants/dashboardData"

const {
  stockNW, stockNW_lm, stockNW_ld,
  bondNW, bondNW_lm, bondNW_ld,
  cashNW, cashNW_lm, cashNW_ld,
  invest_amount
} = dashboardData;

const netWorth = stockNW + bondNW + cashNW;
const netWorth_lm = stockNW_lm + bondNW_lm + cashNW_lm;
const netWorth_ld = stockNW_ld + bondNW_ld + cashNW_ld;

const per_netWorth = ((netWorth - netWorth_lm) / netWorth_lm) * 100;
const today_gain = netWorth - netWorth_ld;
const today_gain_pct = ((netWorth - netWorth_ld) / netWorth_ld) * 100;
const available_cash_pct = (cashNW / netWorth) * 100;
const total_return_pct = ((netWorth - invest_amount) / invest_amount) * 100;


export default function PortfolioDashboard() {
  const [assetType, setAssetType] = useState("stocks")

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
                <AvatarImage src="/UserAvatarSample.png?height=32&width=32" />
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
            <a href="#" className="flex items-center space-x-3 text-blue-600 bg-blue-50 p-2 rounded-lg">
              <LayoutDashboard className="h-4 w-4" /><span>Dashboard</span>
            </a>
            <a href="/asset-detail" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
              <FileText className="h-4 w-4" /><span>Asset Detail</span>
            </a>
            <a href="profit-analysis" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
              <TrendingUp className="h-4 w-4" /><span>Profit Analysis</span>
            </a>
            <a href="/portfolio-detail" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
              <Briefcase className="h-4 w-4" /><span>Portfolio Detail</span>
            </a>
            <a href="/market-information" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
              <Globe className="h-4 w-4" /><span>Market Information</span>
            </a>
            <a href="/settings" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
              <Settings className="h-4 w-4" /><span>Settings</span>
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Title */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Portfolio Dashboard</h1>
              <p className="text-gray-600">Welcome back, here's your portfolio overview</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* 总资产 */}
              <Card>
                <CardHeader className="text-sm font-medium text-left flex-1">
                  <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${netWorth.toLocaleString()}</div>
                  <p className="text-xs text-green-600 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    {per_netWorth >= 0 ? "+" : ""}{per_netWorth.toFixed(2)}% from last month
                  </p>
                </CardContent>
              </Card>

              {/* 今日盈亏 */}
              <Card>
                <CardHeader className="text-sm font-medium text-left flex-1">
                  <CardTitle className="text-sm font-medium">Today's Gain/Loss</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${today_gain >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {today_gain >= 0 ? "+" : "-"}${Math.abs(today_gain).toLocaleString()}
                  </div>
                  <p className={`text-xs flex items-center ${today_gain_pct >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {today_gain_pct >= 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                    {today_gain_pct >= 0 ? "+" : ""}{today_gain_pct.toFixed(2)}% today
                  </p>
                </CardContent>
              </Card>

              {/* 现金 */}
              <Card>
                <CardHeader className="text-sm font-medium text-left flex-1">
                  <CardTitle className="text-sm font-medium">Available Cash</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${cashNW.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">{available_cash_pct.toFixed(1)}% of portfolio</p>
                </CardContent>
              </Card>

              {/* 总收益 */}
              <Card>
                <CardHeader className="text-sm font-medium text-left flex-1">
                  <CardTitle className="text-sm font-medium">Total Return</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${total_return_pct >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {total_return_pct >= 0 ? "+" : ""}{total_return_pct.toFixed(1)}%
                  </div>
                  <p className="text-xs text-muted-foreground">Since inception</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Asset Distribution */}
                <Card>
                  <CardHeader><CardTitle>Asset Distribution</CardTitle></CardHeader>
                  <CardContent>
                    <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={assetData} cx="50%" cy="50%" outerRadius={80} dataKey="value" nameKey="name" label>
                            {assetData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Profit Trends */}
                <Card>
                  <CardHeader><CardTitle>Profit Trends (Last 6 Months)</CardTitle></CardHeader>
                  <CardContent>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={profitTrendData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Net Worth */}
                <Card>
                  <CardHeader><CardTitle>Net Worth</CardTitle></CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Net Worth</span>
                      <span className="font-bold text-lg">${netWorth.toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Market Conditions */}
                <Card>
                  <CardHeader><CardTitle>Market Conditions</CardTitle></CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {marketData.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <span className="text-sm">{item.name}</span>
                          <div className="flex items-center">
                            <span className="text-sm font-medium">{item.value}</span>
                            {item.change >= 0 ? (
                              <>
                                <ArrowUpRight className="h-3 w-3 text-green-600 ml-1" />
                                <span className="text-xs text-green-600 ml-1">+{item.change}%</span>
                              </>
                            ) : (
                              <>
                                <ArrowDownRight className="h-3 w-3 text-red-600 ml-1" />
                                <span className="text-xs text-red-600 ml-1">{item.change}%</span>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>


                {/* Stocks / Bonds Switcher */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {assetType === "stocks" ? "Stocks Performance" : "Bond Performance"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-2 mb-4">
                      <Button
                        variant={assetType === "stocks" ? "default" : "outline"}
                        onClick={() => setAssetType("stocks")}
                      >
                        Stocks
                      </Button>
                      <Button
                        variant={assetType === "bonds" ? "default" : "outline"}
                        onClick={() => setAssetType("bonds")}
                      >
                        Bonds
                      </Button>
                    </div>

                    {assetType === "stocks" && (
                      <div className="space-y-3">
                        {stockData.map((stock) => (
                          <div key={stock.symbol} className="flex items-center justify-between">
                            <div>
                              <span className="text-sm font-medium">{stock.symbol}</span>
                              <p className="text-xs text-muted-foreground">{stock.name}</p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center">
                                {stock.change >= 0 ? (
                                  <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                                ) : (
                                  <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
                                )}
                                <span
                                  className={`text-sm font-medium ${
                                    stock.change >= 0 ? "text-green-600" : "text-red-600"
                                  }`}
                                >
                                  {stock.change >= 0 ? "+" : ""}
                                  {stock.change}%
                                </span>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                ${stock.value.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {assetType === "bonds" && (
                      <div className="space-y-3">
                        {bondData.map((bond) => (
                          <div key={bond.name} className="flex items-center justify-between">
                            <div>
                              <span className="text-sm font-medium">{bond.name}</span>
                              <p className="text-xs text-muted-foreground">{bond.yield} Yield</p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center">
                                {bond.change >= 0 ? (
                                  <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                                ) : (
                                  <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
                                )}
                                <span
                                  className={`text-sm font-medium ${
                                    bond.change >= 0 ? "text-green-600" : "text-red-600"
                                  }`}
                                >
                                  {bond.change >= 0 ? "+" : ""}
                                  {bond.change}%
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
