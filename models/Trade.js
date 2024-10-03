class Trade {
  constructor(symbol, type, price, quantity, timestamp) {
    this.symbol = symbol;
    this.type = type; // 'buy' or 'sell'
    this.price = price;
    this.quantity = quantity;
    this.timestamp = timestamp || new Date();
  }

  getValue() {
    return this.price * this.quantity;
  }
}

module.exports = Trade;
