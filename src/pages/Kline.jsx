// src/pages/Kline.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import KLineChart from "../components/KLineChart";
import { fetchAssetHistory } from "../api/assertInfo";

import { Avatar, AvatarFallback, AvatarImage } from "/src/components/ui/avatar";
import { Button } from "/src/components/ui/button";
import {
  Search, Bell, LayoutDashboard, FileText, TrendingUp, Briefcase,
  Globe, Settings
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "/src/components/ui/card";

export default function Kline() {
  const { assetCode } = useParams();
  const [loading, setLoading] = useState(true);
  const [assetData, setAssetData] = useState(null);

  useEffect(() => {
    async function loadHistory() {
      try {
        setLoading(true);
        const data = await fetchAssetHistory(assetCode);
        setAssetData(data);
      } catch (err) {
        console.error("❌ 获取资产历史数据失败", err);
      } finally {
        setLoading(false);
      }
    }
    loadHistory();
  }, [assetCode]);

  if (loading) return <div className="p-6 text-gray-600">📈 正在加载 {assetCode} 的历史数据...</div>;
  if (!assetData) return <div className="p-6 text-red-600">❌ 数据加载失败</div>;

  const {
    name,
    assetType,
    currency,
    dateArr,
    historyPriceArr,
    currentPrice,
    prevPrice,
    changeAmount,
    changePercent,
    high52w,
    low52w,
    avgPrice,
  } = assetData;

  const isUp = Number(changeAmount) >= 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ 顶部 Header */}
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
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-gray-800">User</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* ✅ 左侧 Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-6">
          <nav className="space-y-2">
            <a href="/dashboard" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
              <LayoutDashboard className="h-4 w-4" /><span>Dashboard</span>
            </a>
            <a href="/profit-analysis" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
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

        {/* ✅ 主内容区域 */}
        <main className="flex-1 p-6 space-y-6">
          {/* ✅ 标题 + 当前价格 */}
          <div className="flex items-end space-x-4">
            <h1 className="text-2xl font-bold text-gray-800">{name} ({assetCode})</h1>
            <span className={`text-3xl font-bold ${isUp ? "text-green-600" : "text-red-600"}`}>
              {currency} {currentPrice?.toFixed(2)}
            </span>
            <span className={`text-lg ${isUp ? "text-green-500" : "text-red-500"}`}>
              {isUp ? "+" : ""}{changeAmount} ({isUp ? "+" : ""}{changePercent}%)
            </span>
          </div>
          <p className="text-gray-500">资产类型: {assetType} | 最新更新: {new Date(assetData.updatedAt).toLocaleString()}</p>

          {/* ✅ 指标卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Card>
              <CardHeader><CardTitle>52周最高</CardTitle></CardHeader>
              <CardContent><p className="text-green-600 font-semibold">{currency} {high52w}</p></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>52周最低</CardTitle></CardHeader>
              <CardContent><p className="text-red-600 font-semibold">{currency} {low52w}</p></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>平均价格</CardTitle></CardHeader>
              <CardContent><p className="text-gray-700 font-semibold">{currency} {avgPrice}</p></CardContent>
            </Card>
          </div>

          {/* ✅ K线图 */}
          <div className="bg-white p-4 rounded-xl shadow">
            <KLineChart dateArr={dateArr} priceArr={historyPriceArr} />
          </div>
        </main>
      </div>
    </div>
  );
}
