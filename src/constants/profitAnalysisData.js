// profitAnalysisData.js

// 时间序列收益数据（不包含 All，由前端合并）
export const portfolioReturns = {
  "Growth Portfolio": [
    { time: "09:30", value: 50000 },
    { time: "10:30", value: 51000 },
    { time: "11:30", value: 50500 },
    { time: "12:30", value: 51500 },
    { time: "13:30", value: 52000 },
    { time: "14:30", value: 52500 },
    { time: "15:30", value: 53000 },
  ],
  "Income Portfolio": [
    { time: "09:30", value: 50000 },
    { time: "10:30", value: 50500 },
    { time: "11:30", value: 50300 },
    { time: "12:30", value: 50600 },
    { time: "13:30", value: 51500 },
    { time: "14:30", value: 51700 },
    { time: "15:30", value: 52000 },
  ]
}

export const assetReturns = [
  { name: "AAPL", return: 6.2, type: "stock" },
  { name: "GOOGL", return: -3.5, type: "stock" },
  { name: "MSFT", return: 2.1, type: "stock" },
  { name: "TSLA", return: -5.2, type: "stock" },
  { name: "AMZN", return: 4.4, type: "stock" },
  { name: "NVDA", return: -2.0, type: "stock" },
  { name: "Bond A", return: 1.8, type: "bond" },
  { name: "Bond B", return: -0.4, type: "bond" },
  { name: "Bond C", return: 0.9, type: "bond" },
  { name: "Bond D", return: 2.3, type: "bond" },
  { name: "Bond E", return: -1.1, type: "bond" }
]

// 不再使用 All 组合
export const tradeRecords = [
  { portfolio: "Growth Portfolio", assetType: "bond", action: "buy", price: 98, profit: 20, date: "2025-07-21" },
  { portfolio: "Growth Portfolio", assetType: "stock", action: "sell", price: 220, profit: 60, date: "2025-07-23" },
  { portfolio: "Growth Portfolio", assetType: "stock", action: "buy", price: 210, profit: 90, date: "2025-07-26" },
  { portfolio: "Growth Portfolio", assetType: "stock", action: "sell", price: 215, profit: -15, date: "2025-07-27" },
  { portfolio: "Income Portfolio", assetType: "bond", action: "buy", price: 100, profit: 10, date: "2025-07-20" },
  { portfolio: "Income Portfolio", assetType: "bond", action: "sell", price: 102, profit: -5, date: "2025-07-24" },
  { portfolio: "Income Portfolio", assetType: "stock", action: "buy", price: 150, profit: 50, date: "2025-07-21" },
  { portfolio: "Income Portfolio", assetType: "stock", action: "sell", price: 160, profit: 25, date: "2025-07-28" }
]
