// constants/marketData.js

// 涨跌分布数据
export const riseFallDistribution = {
  histogram: [
    { range: ">9%", count: 50 },
    { range: "7-9%", count: 80 },
    { range: "5-7%", count: 150 },
    { range: "3-5%", count: 300 },
    { range: "1-3%", count: 2200 },
    { range: "0-1%", count: 2100 },
    { range: "-1-0%", count: 1600 },
    { range: "-3--1%", count: 800 },
    { range: "-5--3%", count: 400 },
    { range: "<-5%", count: 200 },
  ]
}


// 美股指数（可扩展 A 股等）
export const globalIndices = [
  {
    name: "S&P 500",
    value: 4185.47,
    change: 0.8,
    trend: [4100, 4120, 4150, 4200, 4180, 4160, 4185],
  },
  {
    name: "NASDAQ",
    value: 12965.34,
    change: -0.3,
    trend: [12800, 12850, 12900, 12980, 13020, 12900, 12965],
  },
  {
    name: "DOW",
    value: 33745.69,
    change: 1.2,
    trend: [33000, 33200, 33450, 33600, 33750, 33800, 33745],
  },
  {
    name: "VIX",
    value: 18.45,
    change: -2.1,
    trend: [20, 19.5, 19, 18.8, 18.6, 18.5, 18.45],
  }
]



// 个股行情
export const stockQuotes = [
  { symbol: 'AAPL', name: 'Apple Inc.', value: 152.34, change: 1.2 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', value: 318.56, change: -0.8 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', value: 125.67, change: 0.4 },
  { symbol: 'TSLA', name: 'Tesla Inc.', value: 652.78, change: 3.1 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', value: 842.12, change: 2.7 },
]

export const marketRating = {
  score: 4.4,
  suggestion: "The market is active. Consider participating."
}

export const indexTrends = {
  "S&P 500": [
    { time: "09:30", value: 3550 },
    { time: "11:00", value: 3575 },
    { time: "13:00", value: 3560 },
    { time: "15:00", value: 3597 }
  ],
  "NASDAQ": [
    { time: "09:30", value: 12800 },
    { time: "11:00", value: 12850 },
    { time: "13:00", value: 12910 },
    { time: "15:00", value: 12965 }
  ],
  "DOW": [
    { time: "09:30", value: 33500 },
    { time: "11:00", value: 33650 },
    { time: "13:00", value: 33680 },
    { time: "15:00", value: 33745 }
  ],
  "VIX": [
    { time: "09:30", value: 19.5 },
    { time: "11:00", value: 18.9 },
    { time: "13:00", value: 18.7 },
    { time: "15:00", value: 18.45 }
  ]
}

