// src/pages/PortfolioDetail.jsx
import React, { useState, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "/src/components/ui/avatar";
import { Button } from "/src/components/ui/button";
import {
  Search, Bell, LayoutDashboard, FileText, TrendingUp, Briefcase,
  Globe, Settings, ArrowUpRight, ArrowDownRight
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "/src/components/ui/card";
import { portfolios, portfolioItems } from "../constants/portfolioData";

function SortArrow({ columnKey, sortConfig }) {
  if (sortConfig.key !== columnKey) return null;
  return sortConfig.direction === "asc" ? "▲" : "▼";
}

export default function PortfolioDetail() {
  const user = JSON.parse(localStorage.getItem("user"));

  // 计算每个组合的总价值、总收益、资产数量
  const portfolioSummary = portfolios.map(p => {
    const items = portfolioItems.filter(item => item.portfolioId === p.id);
    const totalValue = items.reduce((sum, i) => sum + i.totalValue, 0);
    const totalGain = items.reduce((sum, i) => sum + i.gain, 0);
    const totalGainPercent = totalValue ? ((totalGain / (totalValue - totalGain)) * 100).toFixed(2) : "0.00";
    return {
      ...p,
      totalValue,
      totalGain,
      totalGainPercent,
      assetCount: items.length,
    };
  });

  // 排序状态
  const [sortConfig, setSortConfig] = useState({ key: "portfolioId", direction: "asc" });

  // 筛选状态
  const [filterPortfolioId, setFilterPortfolioId] = useState("all");
  const [filterAssetType, setFilterAssetType] = useState("all");

  // 给资产加上组合名称字段
  const assetsWithPortfolio = portfolioItems.map(item => {
    const p = portfolios.find(p => p.id === item.portfolioId);
    return {
      ...item,
      portfolioName: p ? p.name : "Unknown",
    };
  });

  // 处理排序请求
  function requestSort(key) {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  }

  // 先筛选再排序
  const filteredAndSortedAssets = useMemo(() => {
    let filtered = assetsWithPortfolio;

    if (filterPortfolioId !== "all") {
      filtered = filtered.filter(item => item.portfolioId === Number(filterPortfolioId));
    }

    if (filterAssetType !== "all") {
      filtered = filtered.filter(item => item.assetType === filterAssetType);
    }

    if (sortConfig !== null) {
      filtered = [...filtered].sort((a, b) => {
        let aKey = a[sortConfig.key];
        let bKey = b[sortConfig.key];
        if (typeof aKey === "string") aKey = aKey.toLowerCase();
        if (typeof bKey === "string") bKey = bKey.toLowerCase();

        if (aKey < bKey) return sortConfig.direction === "asc" ? -1 : 1;
        if (aKey > bKey) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [assetsWithPortfolio, filterPortfolioId, filterAssetType, sortConfig]);

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

      {/* Main layout */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-6">
          <nav className="space-y-2">
            <a href="/dashboard" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
              <LayoutDashboard className="h-4 w-4" /><span>Dashboard</span>
            </a>
            <a href="asset-detail" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
              <Briefcase className="h-4 w-4" /><span>Asset Detail</span>
            </a>
            <a href="/profit-analysis" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
              <TrendingUp className="h-4 w-4" /><span>Profit Analysis</span>
            </a>
            <a href="/portfolio-detail" className="flex items-center space-x-3 text-blue-600 bg-blue-50 p-2 rounded-lg">
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

        {/* Content */}
        <main className="flex-1 p-6 space-y-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Investment Portfolios</h1>

          {/* 组合汇总卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {portfolioSummary.map((p) => (
              <Card key={p.id}>
                <CardHeader>
                  <CardTitle>{p.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Created At: {p.createdAt}</p>
                  <p>Total Value: <span className="text-green-600 font-semibold">${p.totalValue.toLocaleString()}</span></p>
                  <p>Total Gain: <span className={`font-semibold ${p.totalGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {p.totalGain >= 0 ? '+' : ''}${p.totalGain.toLocaleString()}</span> ({p.totalGainPercent}%)
                  </p>
                  <p>Asset Count: {p.assetCount}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 筛选控件 */}
          <div className="flex space-x-4 mb-4">
            <select
              value={filterPortfolioId}
              onChange={e => setFilterPortfolioId(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1"
            >
              <option value="all">All Portfolios</option>
              {portfolios.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>

            <select
              value={filterAssetType}
              onChange={e => setFilterAssetType(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1"
            >
              <option value="all">All Asset Types</option>
              {[...new Set(portfolioItems.map(item => item.assetType))].map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* 资产明细表格 */}
          <div className="overflow-auto">
            <table className="w-full table-auto text-sm text-left bg-white border border-gray-200">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th
                    className="px-4 py-2 border cursor-pointer"
                    onClick={() => requestSort("portfolioId")}
                  >
                    Portfolio ID <SortArrow columnKey="portfolioId" sortConfig={sortConfig} />
                  </th>
                  <th
                    className="px-4 py-2 border cursor-pointer"
                    onClick={() => requestSort("portfolioName")}
                  >
                    Portfolio Name <SortArrow columnKey="portfolioName" sortConfig={sortConfig} />
                  </th>
                  <th
                    className="px-4 py-2 border cursor-pointer"
                    onClick={() => requestSort("assetCode")}
                  >
                    Asset Code <SortArrow columnKey="assetCode" sortConfig={sortConfig} />
                  </th>
                  <th
                    className="px-4 py-2 border cursor-pointer"
                    onClick={() => requestSort("name")}
                  >
                    Name <SortArrow columnKey="name" sortConfig={sortConfig} />
                  </th>
                  <th
                    className="px-4 py-2 border cursor-pointer"
                    onClick={() => requestSort("assetType")}
                  >
                    Type <SortArrow columnKey="assetType" sortConfig={sortConfig} />
                  </th>
                  <th
                    className="px-4 py-2 border cursor-pointer"
                    onClick={() => requestSort("quantity")}
                  >
                    Quantity <SortArrow columnKey="quantity" sortConfig={sortConfig} />
                  </th>
                  <th
                    className="px-4 py-2 border cursor-pointer"
                    onClick={() => requestSort("currentPrice")}
                  >
                    Price <SortArrow columnKey="currentPrice" sortConfig={sortConfig} />
                  </th>
                  <th
                    className="px-4 py-2 border cursor-pointer"
                    onClick={() => requestSort("totalValue")}
                  >
                    Total Value <SortArrow columnKey="totalValue" sortConfig={sortConfig} />
                  </th>
                  <th
                    className="px-4 py-2 border cursor-pointer"
                    onClick={() => requestSort("gain")}
                  >
                    Gain <SortArrow columnKey="gain" sortConfig={sortConfig} />
                  </th>
                  <th
                    className="px-4 py-2 border cursor-pointer"
                    onClick={() => requestSort("purchaseDate")}
                  >
                    Purchase Date <SortArrow columnKey="purchaseDate" sortConfig={sortConfig} />
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedAssets.map((asset) => (
                  <tr key={asset.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{asset.portfolioId}</td>
                    <td className="px-4 py-2">{asset.portfolioName}</td>
                    <td className="px-4 py-2">{asset.assetCode}</td>
                    <td className="px-4 py-2">{asset.name}</td>
                    <td className="px-4 py-2">{asset.assetType}</td>
                    <td className="px-4 py-2">{asset.quantity}</td>
                    <td className="px-4 py-2">${asset.currentPrice}</td>
                    <td className="px-4 py-2 font-semibold">${asset.totalValue.toLocaleString()}</td>
                    <td className={`px-4 py-2 font-semibold ${asset.gain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {asset.gain >= 0 ? '+' : ''}${asset.gain}
                    </td>
                    <td className="px-4 py-2">{asset.purchaseDate}</td>
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
