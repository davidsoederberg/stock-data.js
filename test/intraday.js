const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const intraday = require('../src/functions/intraday');
require('dotenv').config();

const API_TOKEN_ENV = process.env.API_TOKEN_TEST;

chai.use(chaiAsPromised);
const { expect } = chai;

describe('testing intraday function', () => {
  it('should be rejected with error because a symbol is not provided', () => {
    expect(intraday({ API_TOKEN: 'DEMO' })).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because API_TOKEN is invalid', () => {
    expect(intraday({ symbols: ['AAPL', 'MSFT', 'HSBA.L'], API_TOKEN: '123' })).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because API_TOKEN is not provided', () => {
    expect(intraday({ symbol: 'AAPL' })).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because interval is not provided', () => {
    expect(intraday({ symbol: 'AAPL', API_TOKEN: API_TOKEN_ENV, options: { range: 7 } })).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because range is not provided', () => {
    expect(intraday({ symbol: 'AAPL', API_TOKEN: API_TOKEN_ENV, options: { interval: 1 } })).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because interval not valid', () => {
    expect(intraday({ symbol: 'AAPL', API_TOKEN: API_TOKEN_ENV, options: { interval: 4, range: 5 } })).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because range not valid', () => {
    expect(intraday({ symbol: 'AAPL', API_TOKEN: API_TOKEN_ENV, options: { interval: 1, range: 8 } })).to.be.rejectedWith(Error);
  });
  it('should return correctly without error', async () => {
    const data = await intraday({ symbol: 'AAPL', API_TOKEN: 'DEMO', options: { range: 1, interval: 1 } });
    expect(data.symbol).to.be.equal('AAPL');
    expect(data.stock_exchange_short).to.be.equal('NASDAQ');
  });
});
