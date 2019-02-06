const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const realtime = require('../src/functions/realtime');
require('dotenv').config();

const API_TOKEN_ENV = process.env.API_TOKEN_TEST;

chai.use(chaiAsPromised);
const { expect } = chai;

describe('testing realtime function', () => {
  describe('testing stock calls', () => {
    it('should be rejected with error because symbols are not provided', () => {
      expect(realtime({ API_TOKEN: 'DEMO' })).to.be.rejectedWith(Error);
    });
    it('should be rejected with error because API_TOKEN is invalid', () => {
      expect(realtime({ symbols: ['AAPL', 'MSFT', 'HSBA.L'], API_TOKEN: '123' })).to.be.rejectedWith(Error);
    });
    it('should be rejected with error because an API_TOKEN is not provided', () => {
      expect(realtime({ symbols: ['AAPL', 'MSFT', 'HSBA.L'] })).to.be.rejectedWith(Error);
    });
    it('should return data of one stock without error', async () => {
      const data = await realtime({ FUND: false, symbols: 'AAPL', API_TOKEN: API_TOKEN_ENV });
      expect(data.symbols_requested).to.be.equals(1);
      expect(data.symbols_returned).to.be.equals(1);
      expect(data.data).to.be.length(1);
    });
    it('should return data of every stock without error', async () => {
      const data = await realtime({ symbols: ['AAPL', 'MSFT', 'HSBA.L'], API_TOKEN: 'DEMO' });
      expect(data.symbols_requested).to.be.equals(3);
      expect(data.symbols_returned).to.be.equals(3);
      expect(data.data).to.be.length(3);
    });
    it('should return data of every stock without error, more than 5 stocks', async () => {
      const data = await realtime({ symbols: ['AAPL', 'MSFT', 'HSBA.L', 'AZA.ST', 'LEO.ST', 'AMZN', 'TSLA', 'SKA-B.ST', 'NDA-SE.ST', 'DBX', 'SPOT'], API_TOKEN: API_TOKEN_ENV });
      expect(data.symbols_requested).to.be.equals(11);
      expect(data.symbols_returned).to.be.equals(11);
      expect(data.data).to.be.length(11);
    });
  });
  describe('testing fund calls', () => {
    it('should be rejected with error because symbols are not provided', () => {
      expect(realtime({ FUND: true })).to.be.rejectedWith(Error);
    });
    it('should return data of one stock without error', async () => {
      const data = await realtime({ FUND: true, symbols: 'AAAAX', API_TOKEN: API_TOKEN_ENV });
      expect(data.symbols_requested).to.be.equals(1);
      expect(data.symbols_returned).to.be.equals(1);
      expect(data.data).to.be.length(1);
    });
    it('should return data of every stock without error', async () => {
      const data = await realtime({ FUND: true, symbols: ['AAAAX', 'AAADX', 'AAAGX'], API_TOKEN: 'DEMO' });
      expect(data.symbols_requested).to.be.equals(3);
      expect(data.symbols_returned).to.be.equals(3);
      expect(data.data).to.be.length(3);
    });
  });
});
