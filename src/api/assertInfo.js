import api from './index';  // ✅ 使用现有 axios 实例

export function fetchAssetHistory(assetCode) {
    return api.get(`/assets/${assetCode}/history`).then(res => res.data);
}