// src/pages/ProfitAnalysis.jsx
import React, { useState, useMemo, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip as LineTooltip, ResponsiveContainer as LineContainer,
  BarChart, Bar, Cell, Legend
} from "recharts";
import {
  LayoutDashboard, Briefcase, TrendingUp, FileText, Globe, Settings, Search, Bell
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "/src/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "/src/components/ui/avatar";
import { Button } from "/src/components/ui/button";

// ✅ 🔗 改成后端 API
import { fetchAllPortfolioReturns, fetchAllAssetReturns, fetchAllTradeRecords } from "../api/portfolio";

export default function ProfitAnalysis() {
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ 数据状态
  const [portfolioReturns, setPortfolioReturns] = useState({});
  const [assetReturns, setAssetReturns] = useState([]);
  const [tradeRecords, setTradeRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ 筛选 & 排序状态
  const [selectedPortfolio, setSelectedPortfolio] = useState("");
  const [assetType, setAssetType] = useState("stock");
  const [filterPortfolio, setFilterPortfolio] = useState("all");
  const [filterAssetType, setFilterAssetType] = useState("all");
  const [filterAction, setFilterAction] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" });

  // 🚀 从 API 获取数据
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        
        const [returnsData, assetData, tradeData] = await Promise.all([
          fetchAllPortfolioReturns(user.id),
          fetchAllAssetReturns(user.id),
          fetchAllTradeRecords(user.id)
        ]);

        setPortfolioReturns(returnsData || {});
        setAssetReturns(assetData || []);
        setTradeRecords(tradeData || []);

        // ✅ 默认选第一个组合
        if (returnsData && Object.keys(returnsData).length > 0) {
          setSelectedPortfolio(Object.keys(returnsData)[0]);
        }
      } catch (error) {
        console.error("❌ 获取收益分析数据失败", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // ✅ 当前组合的收益数据
  const portfolioData = portfolioReturns[selectedPortfolio] || [];
  const filteredAssetData = assetReturns.filter(a => a.type === assetType);

  // ✅ 筛选 + 排序交易记录
  const filteredRecords = useMemo(() => {
    let result = tradeRecords.filter((record) => {
      return (
        (filterPortfolio === "all" || record.portfolio === filterPortfolio) &&
        (filterAssetType === "all" || record.assetType === filterAssetType) &&
        (filterAction === "all" || record.action === filterAction)
      );
    });

    result.sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (sortConfig.key === "date") {
        return sortConfig.direction === "asc"
          ? new Date(aVal) - new Date(bVal)
          : new Date(bVal) - new Date(aVal);
      }
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [filterPortfolio, filterAssetType, filterAction, sortConfig, tradeRecords]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  if (loading) return <div className="p-6 text-gray-600">📡 Loading Profit Analysis...</div>;

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
              <Briefcase className="h-4 w-4" /><span>Asset Detail</span>
            </a>
            <a href="/profit-analysis" className="flex items-center space-x-3 text-blue-600 bg-blue-50 p-2 rounded-lg">
              <TrendingUp className="h-4 w-4" /><span>Profit Analysis</span>
            </a>
            <a href="/portfolio-detail" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
              <FileText className="h-4 w-4" /><span>Portfolio Detail</span>
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
        <main className="flex-1 p-6 space-y-6">
          <h1 className="text-2xl font-bold text-gray-800">Profit Analysis</h1>

          {/* ✅ Portfolio Selector */}
          <div className="w-48">
            <select
              className="border px-3 py-2 rounded w-full"
              value={selectedPortfolio}
              onChange={(e) => setSelectedPortfolio(e.target.value)}
            >
              {Object.keys(portfolioReturns).map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* ✅ Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Line Chart */}
            <Card>
              <CardHeader><CardTitle>Portfolio Returns Over Time</CardTitle></CardHeader>
              <CardContent>
                <div className="h-72 w-full">
                  <LineContainer width="100%" height="100%">
                    <LineChart data={portfolioData}>
                      <XAxis dataKey="time" />
                      <YAxis />
                      <LineTooltip />
                      <Line type="monotone" dataKey="value" stroke="#3B82F6" dot />
                    </LineChart>
                  </LineContainer>
                </div>
              </CardContent>
            </Card>

            {/* Bar Chart */}
            <Card>
              <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>Asset Returns</CardTitle>
                <div className="space-x-2">
                  <button
                    className={`px-3 py-1 rounded ${assetType === "stock" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                    onClick={() => setAssetType("stock")}
                  >
                    Stock
                  </button>
                  <button
                    className={`px-3 py-1 rounded ${assetType === "bond" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                    onClick={() => setAssetType("bond")}
                  >
                    Bond
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-72 w-full">
                  <LineContainer width="100%" height="100%">
                    <BarChart data={filteredAssetData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <LineTooltip />
                      <Legend />
                      <Bar dataKey="return">
                        {filteredAssetData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.return >= 0 ? "#10B981" : "#EF4444"}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </LineContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ✅ Filters */}
          <div className="flex flex-wrap gap-4 mt-6">
            <select className="border px-3 py-1 rounded" value={filterPortfolio} onChange={e => setFilterPortfolio(e.target.value)}>
              <option value="all">All Portfolios</option>
              {[...new Set(tradeRecords.map(r => r.portfolio))].map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>

            <select className="border px-3 py-1 rounded" value={filterAssetType} onChange={e => setFilterAssetType(e.target.value)}>
              <option value="all">All Types</option>
              <option value="stock">Stock</option>
              <option value="bond">Bond</option>
              <option value="cash">Cash</option>
            </select>

            <select className="border px-3 py-1 rounded" value={filterAction} onChange={e => setFilterAction(e.target.value)}>
              <option value="all">All Actions</option>
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </div>

          {/* ✅ Trade Records Table */}
          <div className="overflow-auto mt-4">
            <table className="min-w-full bg-white border text-sm">
              <thead className="bg-gray-100 border-b">
                <tr>
                  {["portfolio", "assetType", "action", "price", "profit", "date"].map((col) => (
                    <th
                      key={col}
                      className="px-4 py-2 border cursor-pointer"
                      onClick={() => handleSort(col)}
                    >
                      {col.charAt(0).toUpperCase() + col.slice(1)} {sortConfig.key === col ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((r, idx) => (
                  <tr key={idx} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{r.portfolio}</td>
                    <td className="px-4 py-2">{r.assetType}</td>
                    <td className="px-4 py-2 capitalize">{r.action}</td>
                    <td className="px-4 py-2">${r.price}</td>
                    <td className={`px-4 py-2 font-semibold ${r.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {r.profit >= 0 ? '+' : ''}${r.profit}
                    </td>
                    <td className="px-4 py-2">{r.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
