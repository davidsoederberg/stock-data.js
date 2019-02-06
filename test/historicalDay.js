const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const historicalDay = require('../src/functions/historicalDay');
require('dotenv').config();

const API_TOKEN_ENV = process.env.API_TOKEN_TEST;

chai.use(chaiAsPromised);
const { expect } = chai;

describe('testing historicalDay function', () => {
  describe('testing stock calls', () => {
    it('should be rejected with error because symbols are not provided', () => {
      expect(historicalDay({ API_TOKEN: 'DEMO', options: { date: '2018-01-02' } })).to.be.rejectedWith(Error);
    });
    it('should be rejected with error because API_TOKEN is invalid', () => {
      expect(historicalDay({ symbols: ['AAPL', 'MSFT'], API_TOKEN: '123', options: { date: '2018-01-02' } })).to.be.rejectedWith(Error);
    });
    it('should be rejected with error because an API_TOKEN is not provided', () => {
      expect(historicalDay({ symbols: ['AAPL', 'MSFT'], options: { date: '2018-01-02' } })).to.be.rejectedWith(Error);
    });
    it('should be rejected with error because date not provided', () => {
      expect(historicalDay({ symbols: ['AAPL', 'MSFT'], API_TOKEN: 'DEMO' })).to.be.rejectedWith(Error);
    });
    it('should be rejected with error because date is invalid', () => {
      expect(historicalDay({ symbols: ['AAPL', 'MSFT'], API_TOKEN: 'demo', options: { date: '2018-01' } })).to.be.rejectedWith(Error);
    });
    it('should return data of one stock without error', async () => {
      const data = await historicalDay({ symbols: 'AAPL', API_TOKEN: API_TOKEN_ENV, options: { date: '2018-01-02' } });
      expect(data.date).to.be.equals('2018-01-02');
      expect(data.data).to.be.length(1);
    });
    it('should return data of every stock without error', async () => {
      const data = await historicalDay({ symbols: ['AAPL', 'MSFT'], API_TOKEN: 'DEMO', options: { date: '2018-01-02' } });
      expect(data.date).to.be.equals('2018-01-02');
      expect(data.data).to.be.length(2);
    });
    it('should return data of every stock without error, more than 2 stocks', async () => {
      const data = await historicalDay({ symbols: ['AAPL', 'MSFT', 'HSBA.L', 'AZA.ST', 'LEO.ST', 'AMZN', 'TSLA', 'SKA-B.ST', 'NDA-SE.ST'], API_TOKEN: API_TOKEN_ENV, options: { date: '2018-01-02' } });
      expect(data.date).to.be.equals('2018-01-02');
      expect(data.data).to.be.length(9);
    });
  });
});
