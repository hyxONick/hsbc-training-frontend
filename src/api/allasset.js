import api from './index'; // axios 实例
export function fetchAllexistingAssets() {
  return api.get('assets').then(res => res.data);
}
