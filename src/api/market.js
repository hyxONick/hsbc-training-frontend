import api from './index'; // axios 实例

export function fetchMarketIndices() {
  return api.get('/market/indices').then(res => res.data);
}

export function fetchRiseFallDistribution() {
  return api.get('/market/rise-fall').then(res => res.data);
}

export function fetchStockQuotes() {
  return api.get('/market/stocks').then(res => res.data);
}

export function fetchAllAssets() {
  return api.get('/market/assets').then(res => res.data);
}
