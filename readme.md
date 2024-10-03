# Trading Bot Backend

This is a basic trading bot backend application that simulates trading on a hypothetical stock market. It uses predefined rules to make buy and sell decisions based on price movements.

## Trading Logic

The trading bot uses a simple strategy based on price changes:

1. If the price of a stock drops by 2% or more, the bot will buy shares.
2. If the price of a stock rises by 3% or more, the bot will sell all shares of that stock.

The bot tracks its positions, balance, and overall profit/loss.

## Setup and Running the Application

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following content:
   ```
   PORT=3000
   STOCK_API_URL=https://api.example.com/stocks
   STOCK_API_KEY=your_api_key_here
   INITIAL_BALANCE=10000
   BUY_THRESHOLD=-0.02
   SELL_THRESHOLD=0.03
   ```
4. Run the application:
   ```
   npm start
   ```

The application will start running on `http://localhost:3000`.

## API Endpoints

- GET `/performance`: Returns a performance report with current balance, positions, trades, and overall profit/loss.

## Mock API Usage

This application uses a mock API to simulate real-time stock prices. In a real-world scenario, you would replace the `getMockStockPrice` method in `stockApiService.js` with actual API calls to a stock market data provider.

## Logging

Logs are written to `error.log` for errors and `combined.log` for all log levels. Console output is also enabled.

![image](https://github.com/user-attachments/assets/ba8bafd8-db1f-46d0-9dcf-9e08c60ef0bb)

