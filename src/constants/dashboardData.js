import api from '../api';

// 🧩 Mock 初始数据
export const dashboardData = {
  stockNW: 12100,
  cashNW: 2100,
  bondNW: 5320,
  stockNW_lm: 11820,
  cashNW_lm: 2030,
  bondNW_lm: 5280,
  stockNW_ld: 12000,
  cashNW_ld: 2080,
  bondNW_ld: 5300,
  invest_amount: 20000,
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
};

// 🍩 饼图资产分布
export const assetData = [
  { name: 'Stocks', value: dashboardData.stockNW },
  { name: 'Bonds', value: dashboardData.bondNW },
  { name: 'Cash', value: dashboardData.cashNW },
];

// 📈 总收益趋势图
export const profitTrendData = dashboardData.stockProfit6M.map((item, idx) => {
  const bond = dashboardData.bondProfit6M[idx]?.profit || 0;
  const cash = dashboardData.cashProfit6M[idx]?.profit || 0;
  return {
    month: item.month,
    profit: item.profit + bond + cash,
  };
});

// 💹 默认股票数据
export let stockData = [
  { symbol: 'AAPL', name: 'Apple Inc.', value: 15240, change: 2.4 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', value: 12890, change: 1.8 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', value: 9650, change: -0.9 },
  { symbol: 'TSLA', name: 'Tesla Inc.', value: 8420, change: 3.2 },
];

// 💸 默认债券数据
export let bondData = [
  { name: 'US Treasury 10Y', yield: '4.25%', change: 0.5 },
  { name: 'Corporate Bonds', yield: '5.1%', change: -0.2 },
  { name: 'Municipal Bonds', yield: '3.8%', change: 0.1 },
];

// 📊 指数数据
export const marketData = [
  { name: 'S&P 500', value: 6389.77, change: 0.02 },
  { name: 'NASDAQ', value: 21178.58, change: 0.3 },
  { name: 'DOW', value: 44837.56, change: -0.1 },
  { name: 'VIX', value: 15.04, change: -2.99 },
];

// 🌈 饼图颜色
export const COLORS = ['#3B82F6', '#10B981', '#FACC15'];


// 🔁 初始化函数（替换所有 mock 数据）
export const initDashboardData = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.id;

    // 1️⃣ 拉 summary 数据
    const resSummary = await api.get(`/statistics/users/${userId}/summary`);
    const summary = resSummary.data;

    dashboardData.stockNW = summary.current.stock;
    dashboardData.bondNW = summary.current.bond;
    dashboardData.cashNW = summary.current.cash;

    dashboardData.stockNW_lm = summary.monthly.stock;
    dashboardData.bondNW_lm = summary.monthly.bond;
    dashboardData.cashNW_lm = summary.monthly.cash;

    dashboardData.stockNW_ld = summary.yesterday.stock;
    dashboardData.bondNW_ld = summary.yesterday.bond;
    dashboardData.cashNW_ld = summary.yesterday.cash;

    dashboardData.invest_amount = summary.totalInvestment;

    assetData[0].value = dashboardData.stockNW;
    assetData[1].value = dashboardData.bondNW;
    assetData[2].value = dashboardData.cashNW;

    // 2️⃣ 拉 6M 收益数据
    const resProfit = await api.get(`/statistics/users/${userId}/monthly-profit?months=6`);
    const profit = resProfit.data;

    dashboardData.stockProfit6M = profit.stockProfit6M;
    dashboardData.bondProfit6M = profit.bondProfit6M;
    dashboardData.cashProfit6M = profit.cashProfit6M;

    // 3️⃣ 拉 Top 股票 / 债券
    const resTop = await api.get(`/statistics/assets/top?limit=5`);
    const top = resTop.data;

    stockData = top.topStocks.map(item => ({
      symbol: item.assetCode,
      name: item.name,
      value: 0, // 如果没有返回金额，默认给 0
      change: item.growth * 100, // 转换为百分比形式
    }));

    bondData = top.topBonds.map(item => ({
      name: item.name,
      yield: '', // 如果后端没返回，可空
      change: item.growth * 100,
    }));

    console.log('✅ dashboardData 初始化成功');
  } catch (err) {
    console.error('❌ 初始化失败：', err.response?.data || err.message);
  }
};
