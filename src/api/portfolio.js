import api from './index';  // ✅ 使用现有 axios 实例

// ✅ 1. 获取所有投资组合（含资产）
export function fetchAllPortfolios() {
  return api.get('/portfolios')
    .then(res => res.data);
}

// ✅ 2. 根据 ID 获取单个投资组合（含资产）
export function fetchPortfolioById(id) {
  return api.get(`/portfolios/${id}`)
    .then(res => res.data);
}

// ✅ 3. 获取用户的所有投资组合
export function fetchUserPortfolios(userId) {
  return api.get(`/portfolios/user/${userId}`)
    .then(res => res.data);
}

// ✅ 4. 搜索 + 分页
export function searchPortfolios(params) {
  return api.get('/portfolios/search', { params })
    .then(res => res.data);
}

// ✅ 5. 获取投资组合统计信息
export function fetchPortfolioStats(id) {
  return api.get(`/portfolios/${id}/stats`)
    .then(res => res.data);
}

// ✅ 6. 创建投资组合（需登录）
export function createPortfolio(data) {
  return api.post('/portfolios/create', data)
    .then(res => res.data);
}

// ✅ 7. 更新投资组合（需登录）
export function updatePortfolio(id, data) {
  return api.post(`/portfolios/update/${id}`, data)
    .then(res => res.data);
}

// ✅ 8. 逻辑删除投资组合（需登录）
export function deletePortfolio(id) {
  return api.post(`/portfolios/delete/${id}`)
    .then(res => res.data);
}

// 获取某个 Portfolio 的收益汇总
export function fetchPortfolioSummary(portfolioId) {
  return api.get(`/portfolios/${portfolioId}/summary`)
    .then(res => res.data);
}

// 9. 获取所有投资组合的收益时间序列
export function fetchAllPortfolioReturns(userId) {
  return api.get(`/portfolios/${userId}/returns`).then(res => res.data);
}

// 10. 获取所有资产的收益率
export function fetchAllAssetReturns(userId) {
  return api.get(`/portfolios/${userId}/asset-returns`).then(res => res.data);
}

// 11. 获取所有买卖交易记录
export function fetchAllTradeRecords(userId) {
  return api.get(`/portfolios/${userId}/trade-records`).then(res => res.data);
}