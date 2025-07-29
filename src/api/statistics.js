import api from './index';  // 你现有的 axios 实例

// 1. 获取前 N 个涨幅最高的股票和债券
export function fetchTopAssets(limit = 5) {
  return api.get('/statistics/assets/top', {
    params: { limit }
  })
  .then(res => res.data);
}

// 2. 获取用户净值统计（当前/当月/昨日 + 投入总金额）
export function fetchUserSummary(userId) {
  return api.get(`/statistics/users/${userId}/summary`)
    .then(res => res.data);
}

// 3. 获取用户近 N 个月的月度收益（股票/债券/现金）
export function fetchUserMonthlyProfit(userId, months = 6) {
  return api.get(`/statistics/users/${userId}/monthly-profit`, {
    params: { months }
  })
  .then(res => res.data);
}
