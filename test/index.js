const { expect } = require('chai');
const stocks = require('../src/index');

describe('testing object created by index.js', () => {
  it('should have function realtime', () => {
    expect(stocks.realtime).to.be.a('function');
  });
});
