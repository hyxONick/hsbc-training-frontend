// constants/marketData.js

// 涨跌分布数据
export const riseFallDistribution = {
  histogram: [
    { range: "Lim Down", count: 13, sortOrder: 0 },
    { range: "-8%", count: 23, sortOrder: 1 },
    { range: "-6%", count: 51, sortOrder: 2 },
    { range: "-4%", count: 274, sortOrder: 3 },
    { range: "-2%", count: 2077, sortOrder: 4 },
    { range: "0", count: 2124, sortOrder: 5 },
    { range: "2%", count: 469, sortOrder: 6 },
    { range: "4%", count: 200, sortOrder: 7 },
    { range: "6%", count: 73, sortOrder: 8 },
    { range: "8%", count: 104, sortOrder: 9 },
    { range: "Lim Up", count: 88, sortOrder: 10 },
  ]
}


// 美股指数（可扩展 A 股等）
export const globalIndices = [
  {
    name: "S&P 500",
    value: 4185.47,
    change: 0.8,
    trend: [
      4105, 4109, 4114, 4118, 4115, 4122,
      4129, 4138, 4145, 4142, 4148, 4153,
      4159, 4154, 4162, 4168, 4175, 4172,
      4178, 4181, 4183, 4184, 4185, 4185.47
    ]
  },
  {
    name: "NASDAQ",
    value: 12965.34,
    change: -0.3,
    trend: [
      13050, 13020, 12980, 12930, 12890, 12860,
      12850, 12890, 12910, 12960, 12990, 12950,
      12930, 12910, 12950, 12980, 13000, 12980,
      12970, 12960, 12955, 12960, 12963, 12965.34
    ]
  },
  {
    name: "DOW",
    value: 33745.69,
    change: 1.2,
    trend: [
      33000, 33080, 33160, 33200, 33250, 33300,
      33380, 33420, 33490, 33510, 33580, 33620,
      33600, 33650, 33700, 33750, 33800, 33760,
      33780, 33770, 33765, 33760, 33748, 33745.69
    ]
  },
  {
    name: "VIX",
    value: 18.45,
    change: -2.1,
    trend: [
      19.5, 19.3, 19.2, 19.0, 18.9, 18.8,
      18.7, 18.85, 18.9, 18.7, 18.6, 18.5,
      18.7, 18.6, 18.5, 18.55, 18.5, 18.45,
      18.47, 18.48, 18.46, 18.45, 18.45, 18.45
    ]
  }
];






// 个股行情
export const stockQuotes = [
  { 
    symbol: 'AAPL', 
    name: 'Apple Inc.', 
    price: 152.34, 
    change: 1.2, 
    changeAmount: 1.83, 
    speed: 0.3, 
    volume: '12.5B' 
  },
  { 
    symbol: 'MSFT', 
    name: 'Microsoft Corp.', 
    price: 318.56, 
    change: -0.8, 
    changeAmount: -2.57, 
    speed: -0.1, 
    volume: '8.7B' 
  },
  { 
    symbol: 'GOOGL', 
    name: 'Alphabet Inc.', 
    price: 125.67, 
    change: 0.4, 
    changeAmount: 0.50, 
    speed: 0.2, 
    volume: '5.2B' 
  },
  { 
    symbol: 'TSLA', 
    name: 'Tesla Inc.', 
    price: 652.78, 
    change: 3.1, 
    changeAmount: 20.21, 
    speed: 1.2, 
    volume: '15.3B' 
  },
  { 
    symbol: 'NVDA', 
    name: 'NVIDIA Corp.', 
    price: 842.12, 
    change: 2.7, 
    changeAmount: 22.74, 
    speed: 0.9, 
    volume: '18.9B' 
  },
]

export function calculateMarketRating(histogram) {
  const total = histogram.reduce((sum, item) => sum + item.count, 0);

  const up = histogram
    .filter(item => ["2%", "4%", "6%", "8%", "Lim Up"].includes(item.range))
    .reduce((sum, item) => sum + item.count, 0);

  const down = histogram
    .filter(item => ["-2%", "-4%", "-6%", "-8%", "Lim Down"].includes(item.range))
    .reduce((sum, item) => sum + item.count, 0);

  const ratio = (up + down) / total;

  // 转换为 0~5 的评分
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
}

export const stockCandlesticks = {
  AAPL: [
    { time: '09:30', open: 185, close: 188, high: 190, low: 183 },
    { time: '10:30', open: 188, close: 186, high: 189, low: 185 },
    { time: '11:30', open: 186, close: 187, high: 188, low: 184 },
    { time: '12:30', open: 187, close: 185, high: 188, low: 183 },
    { time: '13:30', open: 185, close: 189, high: 190, low: 184 }
  ],
  MSFT: [
    { time: '09:30', open: 340, close: 342, high: 345, low: 338 },
    { time: '10:30', open: 342, close: 341, high: 344, low: 340 },
    { time: '11:30', open: 341, close: 343, high: 346, low: 340 },
    { time: '12:30', open: 343, close: 339, high: 344, low: 338 },
    { time: '13:30', open: 339, close: 344, high: 345, low: 338 }
  ],
  GOOGL: [
    { time: '09:30', open: 127, close: 130, high: 131, low: 126 },
    { time: '10:30', open: 130, close: 129, high: 132, low: 128 },
    { time: '11:30', open: 129, close: 128, high: 130, low: 127 },
    { time: '12:30', open: 128, close: 131, high: 132, low: 127 },
    { time: '13:30', open: 131, close: 133, high: 134, low: 130 }
  ],
  TSLA: [
    { time: '09:30', open: 700, close: 710, high: 715, low: 695 },
    { time: '10:30', open: 710, close: 705, high: 712, low: 703 },
    { time: '11:30', open: 705, close: 707, high: 710, low: 704 },
    { time: '12:30', open: 707, close: 702, high: 708, low: 700 },
    { time: '13:30', open: 702, close: 715, high: 718, low: 701 }
  ],
  NVDA: [
    { time: '09:30', open: 800, close: 810, high: 815, low: 795 },  
    { time: '10:30', open: 810, close: 805, high: 812, low: 802 },
    { time: '11:30', open: 805, close: 808, high: 811, low: 804 },
    { time: '12:30', open: 808, close: 802, high: 810, low: 800 },
    { time: '13:30', open: 802, close: 815, high: 818, low: 801 }
  ]
}
