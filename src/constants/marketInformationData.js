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
// 个股行情（已移除 speed 和 volume）
export const stockQuotes = [
  { 
    symbol: 'AAPL', 
    name: 'Apple Inc.', 
    price: 152.34, 
    change: 1.2, 
    changeAmount: 1.83 
  },
  { 
    symbol: 'MSFT', 
    name: 'Microsoft Corp.', 
    price: 318.56, 
    change: -0.8, 
    changeAmount: -2.57 
  },
  { 
    symbol: 'GOOGL', 
    name: 'Alphabet Inc.', 
    price: 125.67, 
    change: 0.4, 
    changeAmount: 0.50 
  },
  { 
    symbol: 'TSLA', 
    name: 'Tesla Inc.', 
    price: 652.78, 
    change: 3.1, 
    changeAmount: 20.21 
  },
  { 
    symbol: 'NVDA', 
    name: 'NVIDIA Corp.', 
    price: 842.12, 
    change: 2.7, 
    changeAmount: 22.74 
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 132.77,
    change: 1.5,
    changeAmount: 1.97
  },
  {
    symbol: 'META',
    name: 'Meta Platforms Inc.',
    price: 298.12,
    change: -1.3,
    changeAmount: -3.95
  },
  {
    symbol: 'BABA',
    name: 'Alibaba Group Holding Ltd.',
    price: 89.45,
    change: 0.9,
    changeAmount: 0.80
  }
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

