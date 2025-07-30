// src/pages/PortfolioDetail.jsx
import React, { useState, useEffect, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "/src/components/ui/avatar";
import { Button } from "/src/components/ui/button";
import {
  Search, Bell, LayoutDashboard, FileText, TrendingUp, Briefcase,
  Globe, Settings
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "/src/components/ui/card";

import { fetchUserPortfolios, fetchPortfolioSummary } from "../api/portfolio";
import { fetchAllPortfolioItems } from "../api/portfolioItem";

function SortArrow({ columnKey, sortConfig }) {
  if (sortConfig.key !== columnKey) return null;
  return sortConfig.direction === "asc" ? "▲" : "▼";
}

export default function PortfolioDetail() {
  const [user] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [portfolios, setPortfolios] = useState([]);
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sortConfig, setSortConfig] = useState({ key: "portfolioId", direction: "asc" });
  const [filterPortfolioId, setFilterPortfolioId] = useState("all");
  const [filterAssetType, setFilterAssetType] = useState("all");

  useEffect(() => {
    async function loadData() {
      try {
        if (!user) return;

        const [pData, itemData] = await Promise.all([
          fetchUserPortfolios(user.id),
          fetchAllPortfolioItems()
        ]);

        const summaries = await Promise.all(
          pData.map(p => fetchPortfolioSummary(p.id))
        );

        // ✅ 合并 summary
        const mergedPortfolios = pData.map((p, index) => ({
          ...p,
          totalValue: summaries[index]?.totalValue || 0,
          totalGain: summaries[index]?.totalGain || 0,
          totalGainPercent: summaries[index]?.totalGainPercent || "0.00",
          assetCount: summaries[index]?.assetCount || 0,
          holdings: summaries[index]?.holdings || [],
        }));

        setPortfolios(mergedPortfolios);
        setPortfolioItems(itemData);
      } catch (err) {
        console.error("❌ 加载数据失败", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [user]);

  function requestSort(key) {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  }

  // ✅ useMemo 整理 holdingsMap
  const filteredAndSortedAssets = useMemo(() => {
    const holdingsMap = {};
    portfolios.forEach(p => {
      if (!p.holdings) return;
      p.holdings.forEach(h => {
        holdingsMap[`${p.id}_${h.assetCode}`] = h;
      });
    });

    let filtered = portfolioItems.map(item => {
      const p = portfolios.find(p => p.id === item.portfolioId);
      const holding = holdingsMap[`${item.portfolioId}_${item.assetCode}`] || {};
      return {
        ...item,
        companyName: holding.name,
        portfolioName: p ? p.name : "Unknown",
        currentPrice: holding.currentPrice || null,
        totalValue: holding.marketValue || 0,
        gain: holding.unrealizedGain || 0,
        status: holding.status || "closed",   // ✅ 带 status
      };
    });

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
  }, [portfolioItems, portfolios, filterPortfolioId, filterAssetType, sortConfig]);

  if (loading) return <div className="p-6 text-gray-600">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Header */}
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

      {/* ✅ Sidebar */}
      <div className="flex">
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-6">
          <nav className="space-y-2">
            <a href="/dashboard" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
              <LayoutDashboard className="h-4 w-4" /><span>Dashboard</span>
            </a>
            <a href="/asset-detail" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
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

        {/* ✅ Main Content */}
        <main className="flex-1 p-6 space-y-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Investment Portfolios</h1>

          {/* ✅ Portfolio Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {portfolios.map((p) => (
              <Card key={p.id}>
                <CardHeader>
                  <CardTitle>{p.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Created At: {new Date(p.createdAt).toLocaleDateString()}</p>
                  <p>Total Value: <span className="text-green-600 font-semibold">${p.totalValue.toLocaleString()}</span></p>
                  <p>Total Gain: <span className={`font-semibold ${p.totalGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {p.totalGain >= 0 ? '+' : ''}${p.totalGain.toLocaleString()}</span> ({p.totalGainPercent}%)
                  </p>
                  <p>Asset Count: {p.assetCount}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* ✅ Filters */}
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

          {/* ✅ Table */}
          <div className="overflow-auto">
            <table className="w-full table-auto text-sm text-left bg-white border border-gray-200">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  {[
                    ["portfolioId", "Portfolio ID"],
                    ["portfolioName", "Portfolio Name"],
                    ["assetCode", "Asset Code"],
                    ["companyName", "Name"], // 持仓 / 做空 / 清仓
                    ["assetType", "Type"],
                    ["quantity", "Quantity"],
                    ["currentPrice", "Price"],
                    ["totalValue", "Total Value"],
                    ["gain", "Gain"],
                    ["purchaseDate", "Purchase Date"]
                  ].map(([key, label]) => (
                    <th
                      key={key}
                      className="px-4 py-2 border cursor-pointer"
                      onClick={() => requestSort(key)}
                    >
                      {label} <SortArrow columnKey={key} sortConfig={sortConfig} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedAssets.map((asset) => (
                  <tr key={asset.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{asset.portfolioId}</td>
                    <td className="px-4 py-2">{asset.portfolioName}</td>
                    <td className="px-4 py-2">{asset.assetCode}</td>

                    {/* ✅ 在名称后面贴状态标签 */}
                    <td className="px-4 py-2">
                      {asset.companyName}
                      {asset.status && (
                        <span
                          className={`ml-2 px-2 py-0.5 rounded text-xs font-bold
                            ${asset.status === 'long' ? 'bg-green-100 text-green-700' :
                              asset.status === 'short' ? 'bg-orange-100 text-orange-700' :
                              'bg-gray-100 text-gray-600'}`}
                        >
                          {asset.status.toUpperCase()}
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-2">{asset.assetType}</td>
                    <td className="px-4 py-2">{Number(asset.quantity).toFixed(4)}</td>
                    <td className="px-4 py-2">${asset.currentPrice !== null ? asset.currentPrice.toFixed(2) : '-'}</td>
                    <td className="px-4 py-2 font-semibold">${(asset.totalValue || 0).toLocaleString()}</td>
                    <td className={`px-4 py-2 font-semibold ${asset.gain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {asset.gain >= 0 ? '+' : ''}${asset.gain.toFixed(2)}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(asset.purchaseDate).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
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
