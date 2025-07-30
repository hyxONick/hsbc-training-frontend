import api from './index';  // ✅ 复用 axios 实例

// ✅ 1. 获取所有 PortfolioItem（全量）
export function fetchAllPortfolioItems() {
  return api.get('/portfolio-items')
    .then(res => res.data);
}

// ✅ 2. 根据 ID 获取单个 PortfolioItem
export function fetchPortfolioItemById(id) {
  return api.get(`/portfolio-items/${id}`)
    .then(res => res.data);
}

// ✅ 3. 根据 PortfolioId 获取所有 PortfolioItem
export function fetchItemsByPortfolioId(portfolioId) {
  return api.get(`/portfolio-items/portfolio/${portfolioId}`)
    .then(res => res.data);
}

// ✅ 4. 搜索 PortfolioItem（分页 + 条件）
export function searchPortfolioItems(params) {
  return api.get('/portfolio-items/search', { params })
    .then(res => res.data);
}

// ✅ 5. 创建 PortfolioItem（需登录）
export function createPortfolioItem(data) {
  return api.post('/portfolio-items/create', data)
    .then(res => res.data);
}

// ✅ 6. 更新 PortfolioItem（需登录）
export function updatePortfolioItem(id, data) {
  return api.post(`/portfolio-items/update/${id}`, data)
    .then(res => res.data);
}

// ✅ 7. 删除 PortfolioItem（逻辑删除，需登录）
export function deletePortfolioItem(id) {
  return api.post(`/portfolio-items/delete/${id}`)
    .then(res => res.data);
}

// ✅ 8. 获取持仓汇总（按资产分组）
export function fetchPortfolioHoldings(portfolioId) {
  return api.get(`/portfolio-items/portfolio/${portfolioId}/holdings`)
    .then(res => res.data);
}

// ✅ 9. 获取组合内 PortfolioItem 统计信息
export function fetchPortfolioItemStats(portfolioId) {
  return api.get(`/portfolio-items/portfolio/${portfolioId}/stats`)
    .then(res => res.data);
}

// ✅ 10. 批量创建 PortfolioItem
export function batchCreatePortfolioItems(items) {
  return api.post('/portfolio-items/batch-create', { items })
    .then(res => res.data);
}
