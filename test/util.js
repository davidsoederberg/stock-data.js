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
  });
});
