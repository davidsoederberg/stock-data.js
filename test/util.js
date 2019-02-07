const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const fetchData = require('../src/util/fetchData');
const makeQueries = require('../src/util/makeQueries');
const formatOptions = require('../src/util/formatOptions');
require('dotenv').config();

chai.use(chaiAsPromised);
const { expect } = chai;

describe('testing util functions', () => {
  describe('testing fetchData', () => {
    it('should give error because URL is invalid', () => {
      expect(fetchData('abc', '123', 'xyz')).to.be.rejectedWith(Error);
    });
    it('should return without error', () => {
      expect(fetchData('https://www.worldtradingdata.com/api/v1/stock?symbol=', 'AAPL,MSFT,HSBA.L', 'demo')).to.not.be.rejectedWith(Error);
    });
  });
  describe('testing makeQueries', () => {
    it('should return array with one string', () => {
      expect(makeQueries('AAPL'), 5).to.be.eventually.deep.equal(['AAPL']);
    });
    it('should return array with 3 in length', async () => {
      const data = await makeQueries(['AAPL', 'MSFT', 'HSBA.L', 'AZA.ST', 'LEO.ST', 'AMZN', 'TSLA', 'SKA-B.ST', 'NDA-SE.ST', 'DBX', 'SPOT'], 5);
      expect(data).to.be.length(3);
    });
    it('should return array with 3 in length', async () => {
      const data = await makeQueries(['AAPL', 'MSFT', 'HSBA.L', 'AZA.ST', 'LEO.ST', 'AMZN', 'TSLA', 'SKA-B.ST', 'NDA-SE.ST', 'DBX', 'SPOT'], 2);
      expect(data).to.be.length(6);
    });
  });
  describe('testing formatOptions', () => {
    it('should return a query string because date_from is valid', () => {
      expect(formatOptions({ date_from: '2019-01-01' })).to.be.equal('&date_from=2019-01-01&');
    });
    it('should return an error because date_from is invalid', () => {
      expect(() => formatOptions({ date_from: '2019-01' })).to.throw(Error);
    });
    it('should return a query string because date_to is valid', () => {
      expect(formatOptions({ date_to: '2019-01-01' })).to.be.equal('&date_to=2019-01-01&');
    });
    it('should return an error because date_from is invalid', () => {
      expect(() => formatOptions({ date_to: '2019-01' })).to.throw(Error);
    });
    it('should return a query string because date_from is valid', () => {
      expect(formatOptions({ date: '2019-01-01' })).to.be.equal('&date=2019-01-01&');
    });
    it('should return an error because date_from is invalid', () => {
      expect(() => formatOptions({ date: '2019-01' })).to.throw(Error);
    });
    it('should return a query string because sort is valid (newest)', () => {
      expect(formatOptions({ sort: 'newest' })).to.be.equal('&sort=newest&');
    });
    it('should return a query string because sort is valid (oldest)', () => {
      expect(formatOptions({ sort: 'oldest' })).to.be.equal('&sort=oldest&');
    });
    it('should return a query string because sort is valid (desc)', () => {
      expect(formatOptions({ sort: 'desc' })).to.be.equal('&sort=desc&');
    });
    it('should return a query string because sort is valid (asc)', () => {
      expect(formatOptions({ sort: 'asc' })).to.be.equal('&sort=asc&');
    });
    it('should return an error because sort is invalid', () => {
      expect(() => formatOptions({ sort: 'descending' })).to.throw(Error);
    });
    it('should return a query string because formatted is valid', () => {
      expect(formatOptions({ formatted: false })).to.be.equal('&formatted=false&');
    });
    it('should return an error because formatted is invalid', () => {
      expect(() => formatOptions({ formatted: 'yes' })).to.throw(Error);
    });
    it('should return an error because all arguments are valid', () => {
      expect(formatOptions({
        formatted: true, date_from: '2019-01-01', date_to: '2019-01-02', sort: 'newest'
      })).to.be.equal('&date_from=2019-01-01&date_to=2019-01-02&sort=newest&formatted=true&');
    });
    it('should return an error because sort is invalid', () => {
      expect(() => formatOptions({
        formatted: true, date_from: '2019-01-01', date_to: '2019-01-02', sort: 'descending'
      })).to.throw(Error);
    });
    it('should return a query string because search_by is valid', () => {
      expect(formatOptions({ search_by: 'symbol,name' })).to.be.equal('&search_by=symbol,name&');
    });
    it('should return an error because search_by is invalid', () => {
      expect(() => formatOptions({ search_by: 'currency' })).to.throw(Error);
    });
    it('should return a query string because limit is valid', () => {
      expect(formatOptions({ limit: '333' })).to.be.equal('&limit=333&');
    });
    it('should return an error because limit is invalid', () => {
      expect(() => formatOptions({ limit: '502' })).to.throw(Error);
    });
    it('should return a query string because sort_by is valid', () => {
      expect(formatOptions({ sort_by: 'symbol' })).to.be.equal('&sort_by=symbol&');
    });
    it('should return an error because sort_by is invalid', () => {
      expect(() => formatOptions({ sort_by: 'stock_exchange' })).to.throw(Error);
    });
    it('should return a query string because sort_order is valid', () => {
      expect(formatOptions({ sort_order: 'desc' })).to.be.equal('&sort_order=desc&');
    });
    it('should return an error because sort_order is invalid', () => {
      expect(() => formatOptions({ sort_order: 'descending' })).to.throw(Error);
    });
    it('should return a query string because stock_exchange is valid', () => {
      expect(formatOptions({ stock_exchange: 'NYSE' })).to.be.equal('&stock_exchange=NYSE&');
    });
    it('should return a query string because currency is valid', () => {
      expect(formatOptions({ currency: 'usd' })).to.be.equal('&currency=usd&');
    });
    it('should return a query string because page is valid', () => {
      expect(formatOptions({ page: '1' })).to.be.equal('&page=1&');
    });
  });
});
