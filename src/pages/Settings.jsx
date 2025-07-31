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
  User,
  Lock
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "/src/components/ui/card"

const user = JSON.parse(localStorage.getItem("user"))

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - 与 Dashboard 完全一致 */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-xl font-bold text-blue-600">Portfolio Manager 110101</div>
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
        {/* Sidebar - 现在与 Dashboard 完全一致 */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-6">
          <nav className="space-y-2">
            <a href="/dashboard" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
              <LayoutDashboard className="h-4 w-4" /><span>Dashboard</span>
            </a>
            <a href="/profit-analysis" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
              <TrendingUp className="h-4 w-4" /><span>Profit Analysis</span>
            </a>
            <a href="/portfolio-detail" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
              <Briefcase className="h-4 w-4" /><span>Portfolio Detail</span>
            </a>
            <a href="/market-information" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
              <Globe className="h-4 w-4" /><span>Market Information</span>
            </a>
            <a href="/settings" className="flex items-center space-x-3 text-blue-600 bg-blue-50 p-2 rounded-lg">
              <Settings className="h-4 w-4" /><span>Settings</span>
            </a>
          </nav>
        </aside>

        {/* 主内容区 */}
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
            
            {/* 用户信息卡片 */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium">Username</p>
                  <p className="text-gray-600 mt-1">{user?.username || "Guest"}</p>
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600 mt-1">{user?.email || "Not set"}</p>
                </div>
                <Button variant="outline" className="mt-2">Change Password</Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}