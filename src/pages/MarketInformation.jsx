import React, { useState, useEffect } from "react";
import {
  Search, Bell, LayoutDashboard, FileText, TrendingUp,
  Briefcase, Globe, Settings
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "/src/components/ui/avatar";
import { Button } from "/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "/src/components/ui/card";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, LineChart, Line, Cell
} from "recharts";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { motion } from "framer-motion";
import 'react-circular-progressbar/dist/styles.css';
import { fetchUserPortfolios } from "../api/portfolio";
import { createPortfolioItem } from "../api/portfolioItem";

// ✅ 直接用你封装的 API
import { 
  fetchMarketIndices,
  fetchRiseFallDistribution,
  fetchStockQuotes,
  fetchAllAssets
} from "../api/market";   // ← 注意路径

import{
  fetchAllexistingAssets
} from "../api/allasset.js"; // ← 注意路径

// Y轴范围计算
const getYAxisDomain = (data) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const padding = (max - min) * 0.3;
  return [min - padding, max + padding];
};

// 计算市场评分
const calculateMarketRating = (histogram) => {
  const total = histogram.reduce((sum, item) => sum + item.count, 0);

  const up = histogram
    .filter(item => ["2%", "4%", "6%", "8%", "Lim Up"].includes(item.range))
    .reduce((sum, item) => sum + item.count, 0);

  const down = histogram
    .filter(item => ["-2%", "-4%", "-6%", "-8%", "Lim Down"].includes(item.range))
    .reduce((sum, item) => sum + item.count, 0);

  const ratio = (up + down) / total;
  const score = +(ratio * 5).toFixed(1);

  let suggestion = "";
  if (score >= 4) {
    suggestion = "The market is active. Consider participating.";
  } else if (score >= 2.5) {
    suggestion = "The market shows healthy activity. Moderate opportunities available.";
  } else if (score >= 1) {
    suggestion = "The market is quiet. Consider waiting.";
  } else {
    suggestion = "The market is inactive. Participation not advised.";
  }

  return { score, suggestion };
};

export default function MarketInformation() {
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ 状态
  const [histogram, setHistogram] = useState([]);
  const [indices, setIndices] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [assets, setAssets] = useState([]);
  const [page, setPage] = useState(1);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(assets.length / itemsPerPage);
  const paginatedAssets = assets.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const [stockId, setStockId] = useState("");
  const [selectedPortfolio, setSelectedPortfolio] = useState("");
  const [quantity, setQuantity] = useState("");
  const [portfolios, setPortfolios] = useState([]);



  // ✅ 拉数据
  useEffect(() => {
    const loadData = async () => {
      try {
        const [indicesData, riseFallData, stocksData, assetsData] = await Promise.all([
          fetchMarketIndices(),
          fetchRiseFallDistribution(),
          fetchStockQuotes(),
          fetchAllexistingAssets()
        ]);
        setIndices(indicesData);
        setHistogram(riseFallData.histogram);
        setStocks(stocksData);
        setAssets(assetsData);

        const portfolioData = await fetchUserPortfolios(user.id);
        setPortfolios(portfolioData);
        
      } catch (err) {
        console.error("❌ 加载市场信息失败:", err);
      }
    };

    loadData();
    // ⏳ 每 3 秒刷新一次
    const interval = setInterval(loadData, 3000);
    return () => clearInterval(interval);
  }, []);

  const marketRating = calculateMarketRating(histogram);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-blue-600">Portfolio Manager 110101</div>
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
        {/* ✅ Sidebar */}
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
            <a href="/market-information" className="flex items-center space-x-3 text-blue-600 bg-blue-50 p-2 rounded-lg">
              <Globe className="h-4 w-4" /><span>Market Information</span>
            </a>
            <a href="/settings" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
              <Settings className="h-4 w-4" /><span>Settings</span>
            </a>
          </nav>
        </aside>

        {/* ✅ Main */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Market Information</h1>

            {/* 📊 Market Snapshot */}
            <Card>
              <CardHeader><CardTitle>Market Snapshot</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  
                  {/* Histogram */}
                  <div className="h-72 col-span-12 md:col-span-8">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={histogram}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="range" />
                        <YAxis />
                        <Tooltip />
                        <Bar 
                          dataKey="count" 
                          isAnimationActive={true} 
                          animationDuration={600}
                        >
                          {histogram.map((entry, index) => (
                            <Cell
                              key={index}
                              fill={/^[-]/.test(entry.range) || entry.range === "Lim Down" ? "#EF4444" : "#10B981"}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Market Rating 动效 */}
                  <div className="col-span-12 md:col-span-4 flex flex-col items-center justify-center space-y-4">
                    <motion.div
                      key={marketRating.score}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1 }}
                      className="w-32 h-32"
                    >
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
                    </motion.div>
                    <p className="text-center text-sm text-gray-600">{marketRating.suggestion}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 📈 Index & Stock Side by Side */}
            <div className="flex flex-col lg:flex-row gap-6">
              
              {/* Index Trends */}
              <div className="w-full lg:w-1/2">
                <Card>
                  <CardHeader><CardTitle>Index Trends</CardTitle></CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {indices.map((index, i) => (
                      <motion.div 
                        key={i} 
                        className="bg-white rounded shadow p-4"
                        initial={{ opacity: 0.4 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.2 }}
                      >
                        <div className="flex justify-between mb-2">
                          <div>
                            <p className="text-sm font-medium">{index.name}</p>
                            <motion.p 
                              key={index.change}
                              initial={{ scale: 1.2 }}
                              animate={{ scale: 1 }}
                              className={`text-xs ${index.change >= 0 ? 'text-green-600' : 'text-red-600'}`}
                            >
                              {index.change >= 0 ? '+' : ''}{index.change}%
                            </motion.p>
                          </div>
                          <motion.p 
                            key={index.value}
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            className="text-right font-semibold"
                          >
                            {index.value}
                          </motion.p>
                        </div>
                        <ResponsiveContainer width="100%" height={80}>
                          <LineChart data={index.trend.map((val, idx) => ({ name: idx, value: val }))}>
                            <YAxis domain={getYAxisDomain(index.trend)} hide={true} />
                            <Line type="linear" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
                            <Tooltip />
                          </LineChart>
                        </ResponsiveContainer>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Stock Quotes */}
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
                          {stocks.map((stock, i) => (
                            <tr key={i} className="hover:bg-gray-50">
                              <td className="px-3 py-2 text-sm font-medium text-gray-900">{stock.symbol}</td>
                              <td className="px-3 py-2 text-sm text-gray-500">{stock.name}</td>
                              
                              {/* ✅ 价格动画 */}
                              <td className="px-3 py-2 text-sm text-gray-900">
                                <motion.span
                                  key={stock.price}
                                  initial={{ scale: 1.2, color: "#2563eb" }}
                                  animate={{ scale: 1, color: "#111" }}
                                  transition={{ duration: 1.2 }}
                                >
                                  ${stock.price.toFixed(2)}
                                </motion.span>
                              </td>

                              {/* ✅ 涨跌幅动画 */}
                              <td className={`px-3 py-2 text-sm ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                <motion.span
                                  key={stock.change}
                                  initial={{ opacity: 0.3 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.5 }}
                                >
                                  {stock.change >= 0 ? '+' : ''}{stock.change}%
                                </motion.span>
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

            {/* 📃 All Assets */}
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
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedAssets.map((a, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-4 py-2">{a.assetCode}</td>
                        <td className="px-4 py-2">{a.name}</td>
                        <td className="px-4 py-2 capitalize">{a.assetType}</td>

                        <td className="px-4 py-2">
                          <motion.span
                            key={a.assetCode}
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            ${a.price ? Number(a.price).toFixed(2) : '--'}
                          </motion.span>
                        </td>

                    
                      </tr>
                    ))}

                    </tbody>
                  </table>

                  {/* Pagination */}
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
            {/* 横向购买表单区域 */}
              <div className="mt-6 p-4 border rounded bg-white shadow flex items-center gap-4">
                <input
                  type="text"
                  placeholder="Asset ID (e.g. AAPL)"
                  className="border px-3 py-2 rounded w-40"
                  value={stockId}
                  onChange={(e) => setStockId(e.target.value.toUpperCase())}
                />

                <select
                  className="border px-3 py-2 rounded w-40"
                  value={selectedPortfolio}
                  onChange={(e) => setSelectedPortfolio(e.target.value)}
                >
                  <option value="">Choose Portfolio</option>
                  {portfolios.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}

                </select>

                <input
                  type="number"
                  placeholder="number"
                  className="border px-3 py-2 rounded w-24"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />

                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  onClick={async () => {
                    if (!stockId || !selectedPortfolio || !quantity) {
                      alert("please fill all fields");
                      return;
                    }

                    const asset = assets.find(a => a.assetCode === stockId);
                    if (!asset) {
                      alert("Invalid asset symbol");
                      return;
                    }

                    const payload = {
                      portfolioId: parseInt(selectedPortfolio),  // portfolioId 是数字
                      assetCode: stockId,                        // 股票代码
                      assetType: asset.assetType,                     // 类型如 'stock'
                      amount: Number((asset.price * quantity).toFixed(2)),  // 精确到小数点后两位
                      quantity: parseInt(quantity),              // 数量
                      type: "buy",
                      purchaseDate: new Date().toISOString().split("T")[0], // 格式 '2025-07-31'
                    };
                    console.log(payload);

                    try {
                            const result = await createPortfolioItem(payload);
                            alert("✅ Purchase successful!");
                            console.log("✅ API response:", result);
                          } catch (error) {
                            console.error("❌ API error:", error);
  
                          // 🚨 打印详细响应内容（重点）
                          if (error.response) {
                            console.error("🔍 Response data:", error.response.data);
                            console.error("🔍 Response status:", error.response.status);
                            console.error("🔍 Response headers:", error.response.headers);
                            alert("❌ " + (error.response.data.message || "Server Error"));
                          } else if (error.request) {
                            console.error("❌ No response received:", error.request);
                            alert("❌ No response from server");
                          } else {
                            console.error("❌ Error in setup:", error.message);
                            alert("❌ Unexpected error");
                          }
                        }
                  }}

                >
                  BUY
                </button>
              </div>

          </div>
        </main>
      </div>
    </div>
  );
}
