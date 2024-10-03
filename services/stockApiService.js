const axios = require("axios");
const config = require("../config/config");
const logger = require("../utils/logger");

class StockApiService {
  constructor() {
    this.apiUrl = config.stockApiUrl;
    this.apiKey = config.stockApiKey;
  }

  async getStockPrice(symbol) {
    try {
      const response = await axios.get(`${this.apiUrl}/${symbol}`, {
        headers: {
          "X-API-KEY": this.apiKey,
        },
      });

      return response.data.price;
    } catch (error) {
      logger.error(
        `Error fetching stock price for ${symbol}: ${error.message}`
      );
      throw error;
    }
  }

  // For this example, we'll use a mock API that returns random price changes
  async getMockStockPrice(symbol, lastPrice) {
    const change = (Math.random() - 0.5) * 2; // Random change between -1 and 1
    const newPrice = lastPrice * (1 + change / 100); // Apply percentage change
    return parseFloat(newPrice.toFixed(2));
  }
}

module.exports = new StockApiService();
