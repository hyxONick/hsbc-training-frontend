import { Card, CardContent, CardHeader, CardTitle } from "/src/components/ui/card"
import { Button } from "/src/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "/src/components/ui/avatar"
import { Progress } from "/src/components/ui/progress"
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

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts'

const assetData = [
    { name: 'Stocks', value: 147402 },
    { name: 'Bonds', value: 79818 },
    { name: 'Cash', value: 18450 },
]

const profitTrendData = [
  { month: "Jan", profit: 12.3 },
  { month: "Feb", profit: 8.2 },
  { month: "Mar", profit: -15.1 },
  { month: "Apr", profit: 21.8 },
  { month: "May", profit: -7.4 },
  { month: "Jun", profit: 13.6 },
]

const COLORS = ['#3B82F6', '#10B981', '#FACC15']  // 蓝、绿、黄

export default function PortfolioDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-xl font-bold text-blue-600">Portfolio Manager</div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Overview
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Trading
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Research
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Reports
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-6">
          <nav className="space-y-2">
            <a href="#" className="flex items-center space-x-3 text-blue-600 bg-blue-50 p-2 rounded-lg">
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </a>
            <a href="#" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
              <FileText className="h-4 w-4" />
              <span>Asset Detail</span>
            </a>
            <a href="#" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
              <TrendingUp className="h-4 w-4" />
              <span>Profit Analysis</span>
            </a>
            <a href="#" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
              <Briefcase className="h-4 w-4" />
              <span>Portfolio Detail</span>
            </a>
            <a href="#" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
              <Globe className="h-4 w-4" />
              <span>Market Information</span>
            </a>
            <a href="#" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
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

            {/* Asset Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$245,670</div>
                  <p className="text-xs text-green-600 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +12.5% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Today's Gain/Loss</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">+$2,340</div>
                  <p className="text-xs text-green-600 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +0.96% today
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Available Cash</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$18,450</div>
                  <p className="text-xs text-muted-foreground">7.5% of portfolio</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Return</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">+18.7%</div>
                  <p className="text-xs text-muted-foreground">Since inception</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Asset Distribution & Profit Trends */}
              <div className="lg:col-span-2 space-y-6">
              

            <Card>
            <CardHeader>
                <CardTitle>Asset Distribution</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                    <Pie
                        data={assetData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        nameKey="name"
                        label
                    >
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


                <Card>
                  <CardHeader>
                    <CardTitle>Profit Trends (Last 6 Months)</CardTitle>
                  </CardHeader>
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
                <Card>
                  <CardHeader>
                    <CardTitle>Asset Amount</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Total Assets</span>
                        <span className="font-semibold">$245,670</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Liquid Assets</span>
                        <span className="font-semibold">$165,852</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Fixed Assets</span>
                        <span className="font-semibold">$79,818</span>
                      </div>
                      <div className="flex justify-between items-center border-t pt-2">
                        <span className="text-sm font-medium">Net Worth</span>
                        <span className="font-bold text-lg">$245,670</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Market Conditions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">S&P 500</span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium">4,185.47</span>
                          <ArrowUpRight className="h-3 w-3 text-green-600 ml-1" />
                          <span className="text-xs text-green-600 ml-1">+0.8%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">NASDAQ</span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium">12,965.34</span>
                          <ArrowDownRight className="h-3 w-3 text-red-600 ml-1" />
                          <span className="text-xs text-red-600 ml-1">-0.3%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">DOW</span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium">33,745.69</span>
                          <ArrowUpRight className="h-3 w-3 text-green-600 ml-1" />
                          <span className="text-xs text-green-600 ml-1">+1.2%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">VIX</span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium">18.45</span>
                          <ArrowDownRight className="h-3 w-3 text-green-600 ml-1" />
                          <span className="text-xs text-green-600 ml-1">-2.1%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Holdings Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-medium">AAPL</span>
                          <p className="text-xs text-muted-foreground">Apple Inc.</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center">
                            <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                            <span className="text-sm font-medium text-green-600">+2.4%</span>
                          </div>
                          <span className="text-xs text-muted-foreground">$15,240</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-medium">MSFT</span>
                          <p className="text-xs text-muted-foreground">Microsoft Corp.</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center">
                            <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                            <span className="text-sm font-medium text-green-600">+1.8%</span>
                          </div>
                          <span className="text-xs text-muted-foreground">$12,890</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-medium">GOOGL</span>
                          <p className="text-xs text-muted-foreground">Alphabet Inc.</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center">
                            <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
                            <span className="text-sm font-medium text-red-600">-0.9%</span>
                          </div>
                          <span className="text-xs text-muted-foreground">$9,650</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-medium">TSLA</span>
                          <p className="text-xs text-muted-foreground">Tesla Inc.</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center">
                            <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                            <span className="text-sm font-medium text-green-600">+3.2%</span>
                          </div>
                          <span className="text-xs text-muted-foreground">$8,420</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Bond Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-medium">US Treasury 10Y</span>
                          <p className="text-xs text-muted-foreground">4.25% Yield</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center">
                            <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                            <span className="text-sm font-medium text-green-600">+0.5%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-medium">Corporate Bonds</span>
                          <p className="text-xs text-muted-foreground">5.1% Avg Yield</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center">
                            <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
                            <span className="text-sm font-medium text-red-600">-0.2%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-medium">Municipal Bonds</span>
                          <p className="text-xs text-muted-foreground">3.8% Avg Yield</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center">
                            <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                            <span className="text-sm font-medium text-green-600">+0.1%</span>
                          </div>
                        </div>
                      </div>
                    </div>
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
