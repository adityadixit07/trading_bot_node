const config = require("../config/config");
const stockApiService = require("./stockApiService");
const Trade = require("../models/Trade");
const logger = require("../utils/logger");

class TradingService {
  constructor() {
    this.balance = config.initialBalance;
    this.positions = {};
    this.trades = [];
    this.buyThreshold = config.buyThreshold;
    this.sellThreshold = config.sellThreshold;
  }
  async executeTradingStrategy(symbol) {
    try {
      const currentPrice = await stockApiService.getMockStockPrice(
        symbol,
        this.getLastPrice(symbol)
      );
      const lastPrice = this.getLastPrice(symbol);
      const priceChange = (currentPrice - lastPrice) / lastPrice;

      if (priceChange <= this.buyThreshold) {
        this.buy(symbol, currentPrice);
      } else if (priceChange >= this.sellThreshold) {
        this.sell(symbol, currentPrice);
      }

      this.updatePositions(symbol, currentPrice);
      logger.info(
        `Current price for ${symbol}: ${currentPrice}, Price change: ${(
          priceChange * 100
        ).toFixed(2)}%`
      );
    } catch (error) {
      logger.error(
        `Error executing trading strategy for ${symbol}: ${error.message}`
      );
    }
  }

  buy(symbol, price) {
    const quantity = Math.floor(this.balance / price);
    if (quantity > 0) {
      const trade = new Trade(symbol, "buy", price, quantity);
      this.trades.push(trade);
      this.balance -= trade.getValue();
      logger.info(`Bought ${quantity} shares of ${symbol} at ${price}`);
    }
  }

  sell(symbol, price) {
    const position = this.positions[symbol];
    if (position && position.quantity > 0) {
      const trade = new Trade(symbol, "sell", price, position.quantity);
      this.trades.push(trade);
      this.balance += trade.getValue();
      delete this.positions[symbol];
      logger.info(`Sold ${position.quantity} shares of ${symbol} at ${price}`);
    }
  }

  updatePositions(symbol, currentPrice) {
    if (this.positions[symbol]) {
      this.positions[symbol].currentPrice = currentPrice;
    } else {
      this.positions[symbol] = { quantity: 0, currentPrice };
    }
  }

  getLastPrice(symbol) {
    return this.positions[symbol]?.currentPrice || 100; // Default to 100 if no previous price
  }

  getPerformanceReport() {
    const totalValue =
      this.balance +
      Object.values(this.positions).reduce((sum, position) => {
        return sum + position.quantity * position.currentPrice;
      }, 0);

    const profitLoss = totalValue - config.initialBalance;
    const performancePercentage = (
      (profitLoss / config.initialBalance) *
      100
    ).toFixed(2);

    return {
      initialBalance: config.initialBalance,
      currentBalance: this.balance,
      positions: this.positions,
      trades: this.trades,
      totalValue,
      profitLoss,
      performancePercentage: `${performancePercentage}%`,
    };
  }
}

module.exports = new TradingService();
