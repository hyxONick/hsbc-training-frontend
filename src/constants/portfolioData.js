// src/constants/portfolioData.js

export const portfolios = [
  {
    id: 1,
    userId: 101,
    name: "Growth Portfolio",
    createdAt: "2024-01-11",
  },
  {
    id: 2,
    userId: 101,
    name: "Income Portfolio",
    createdAt: "2023-11-05",
  },
  {
    id: 3,
    userId: 101,
    name: "Speculative Portfolio",
    createdAt: "2024-04-01",
  },
];

// 资产表，portfolioId 对应所属组合id
export const portfolioItems = [
  {
    id: 11,
    portfolioId: 1,
    assetCode: "AAPL",
    name: "Apple Inc.",
    assetType: "stock",
    quantity: 50,
    currentPrice: 170,
    totalValue: 50 * 170,
    gain: 1200,
    purchaseDate: "2023-12-01",
  },
  {
    id: 12,
    portfolioId: 1,
    assetCode: "TSLA",
    name: "Tesla Inc.",
    assetType: "stock",
    quantity: 30,
    currentPrice: 650,
    totalValue: 30 * 650,
    gain: 5000,
    purchaseDate: "2024-02-15",
  },
  {
    id: 13,
    portfolioId: 2,
    assetCode: "BND",
    name: "Vanguard Bond Fund",
    assetType: "bond",
    quantity: 100,
    currentPrice: 85,
    totalValue: 100 * 85,
    gain: 300,
    purchaseDate: "2023-11-10",
  },
  {
    id: 14,
    portfolioId: 3,
    assetCode: "BTC",
    name: "Bitcoin",
    assetType: "crypto",
    quantity: 2,
    currentPrice: 28000,
    totalValue: 2 * 28000,
    gain: 8000,
    purchaseDate: "2024-03-20",
  },
];
