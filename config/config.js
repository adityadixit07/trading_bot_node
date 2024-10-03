require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  stockApiUrl: process.env.STOCK_API_URL,
  stockApiKey: process.env.STOCK_API_KEY,
  initialBalance: parseFloat(process.env.INITIAL_BALANCE) || 10000,
  buyThreshold: parseFloat(process.env.BUY_THRESHOLD) || -0.02,
  sellThreshold: parseFloat(process.env.SELL_THRESHOLD) || 0.03,
};
