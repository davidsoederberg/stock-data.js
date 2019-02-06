const { expect } = require('chai');
const stocks = require('../src/index');

describe('testing object created by index.js', () => {
  it('should have functions realtime', () => {
    expect(stocks.realtime).to.be.a('function');
  });
  it('should have functions historical', () => {
    expect(stocks.historical).to.be.a('function');
  });
  it('should have functions historical', () => {
    expect(stocks.historicalDay).to.be.a('function');
  });
});
