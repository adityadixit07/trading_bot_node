const express = require("express");
const config = require("./config/config");
const tradingService = require("./services/tradingService");
const logger = require("./utils/logger");

const app = express();
const port = config.port;

app.use(express.json());

app.get("/performance", (req, res) => {
  const report = tradingService.getPerformanceReport();
  res.json(report);
});

app.listen(port, () => {
  logger.info(`Trading  backend listening at http://localhost:${port}`);
});

// Simulating continuous trading
const symbols = ["AAPL", "GOOGL", "MSFT", "AMZN"];
setInterval(() => {
  symbols.forEach((symbol) => tradingService.executeTradingStrategy(symbol));
}, 5000); // Execute trading strategy every 5 seconds
