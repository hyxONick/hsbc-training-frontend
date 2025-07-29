import api from '../api';

const user = JSON.parse(localStorage.getItem('user'));
const userId = user?.id;

const getInvestAmount = async () => {
  try {
    const res = await api.get(`/statistics/users/${userId}/summary`);
    const totalInvestment = res.data.totalInvestment;

    console.log('💰 用户投入本金（总充值金额）：', totalInvestment);
    return totalInvestment;
  } catch (error) {
    console.error('❌ 获取用户投入本金失败：', error.response?.data || error.message);
  }
};

getInvestAmount();


// 投入本金（总充值金额）
export const investAmount = 20000

// 净值数据
export const dashboardData = {
  // 股票净值
  stockNW: 12100,       // 当前
  stockNW_lm: 11820,    // 上月末
  stockNW_ld: 12000,    // 昨日

  // 现金净值
  cashNW: 2100,
  cashNW_lm: 2030,
  cashNW_ld: 2080,

  // 债券净值
  bondNW: 5320,
  bondNW_lm: 5280,
  bondNW_ld: 5300,

  invest_amount: investAmount,

  // 近 6 个月各产品收益数组
  stockProfit6M: [
    { month: '2024‑03', profit: 480 },
    { month: '2024‑04', profit: -120 },
    { month: '2024‑05', profit: 320 },
    { month: '2024‑06', profit: 140 },
    { month: '2024‑07', profit: 280 },
    { month: '2024‑08', profit: 360 },
  ],
  bondProfit6M: [
    { month: '2024‑03', profit: 100 },
    { month: '2024‑04', profit: 20 },
    { month: '2024‑05', profit: 80 },
    { month: '2024‑06', profit: 80 },
    { month: '2024‑07', profit: 40 },
    { month: '2024‑08', profit: 60 },
  ],
  cashProfit6M: [
    { month: '2024‑03', profit: -50 },
    { month: '2024‑04', profit: 100 },
    { month: '2024‑05', profit: 20 },
    { month: '2024‑06', profit: -40 },
    { month: '2024‑07', profit: 70 },
    { month: '2024‑08', profit: 30 },
  ],
}

// mock 持有表现最好的股票持仓数据（用于dashboard展示）
export const stockData = [
  { symbol: "AAPL", name: "Apple Inc.", value: 15240, change: 2.4 },
  { symbol: "MSFT", name: "Microsoft Corp.", value: 12890, change: 1.8 },
  { symbol: "GOOGL", name: "Alphabet Inc.", value: 9650, change: -0.9 },
  { symbol: "TSLA", name: "Tesla Inc.", value: 8420, change: 3.2 },
]

// mock 债券收益展示
export const bondData = [
  { name: "US Treasury 10Y", yield: "4.25%", change: 0.5 },
  { name: "Corporate Bonds", yield: "5.1%", change: -0.2 },
  { name: "Municipal Bonds", yield: "3.8%", change: 0.1 },
]

// Market Condition 指数数据
export const marketData = [
  { name: "S&P 500", value: 6389.77, change: 0.02 },
  { name: "NASDAQ", value: 21178.58, change: 0.3 },
  { name: "DOW", value: 44837.56, change: -0.1 },
  { name: "VIX", value: 15.04, change: -2.99 },
]


export const assetData = [
  { name: "Stocks", value: dashboardData.stockNW },
  { name: "Bonds", value: dashboardData.bondNW },
  { name: "Cash", value: dashboardData.cashNW },
];

export const profitTrendData = dashboardData.stockProfit6M.map((item, idx) => {
  const bondProfit = dashboardData.bondProfit6M[idx]?.profit || 0;
  const cashProfit = dashboardData.cashProfit6M[idx]?.profit || 0;
  return {
    month: item.month,
    profit: item.profit + bondProfit + cashProfit,
  };
});

export const COLORS = ["#3B82F6", "#10B981", "#FACC15"];
