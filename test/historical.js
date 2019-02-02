const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const historical = require('../src/functions/historical');
require('dotenv').config();

const API_TOKEN_ENV = process.env.API_TOKEN_TEST;

chai.use(chaiAsPromised);
const { expect } = chai;

describe('testing historical function', () => {
  it('should be rejected with error because a symbol is not provided', () => {
    expect(historical({ API_TOKEN: 'DEMO' })).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because a symbol is not provided', () => {
    expect(historical({ symbol: 'AAPL' })).to.be.rejectedWith(Error);
  });
  it('should return historical data of one stock without error', async () => {
    const data = await historical({ symbol: 'AAPL', API_TOKEN: API_TOKEN_ENV });
    expect(data.name).to.be.equal('AAPL');
    expect(data).to.have.property('history');
  });
  it('should be rejected because options is invalid', async () => {
    expect(historical({ symbol: 'AAPL', API_TOKEN: API_TOKEN_ENV, options: { sort: 'descending' } })).to.be.rejectedWith(Error);
  });
  it('should be return unformatted historical data', async () => {
    const data = await historical({ symbol: 'AAPL', API_TOKEN: API_TOKEN_ENV, options: { formatted: false } });
    expect(data.history[0]).to.have.property('date');
    expect(data.history[0]).to.have.property('data');
  });
  it('should be return historical data from date_from to date_to', async () => {
    const data = await historical({ symbol: 'AAPL', API_TOKEN: API_TOKEN_ENV, options: { formatted: false, date_from: '2018-12-14', date_to: '2019-01-31' } });
    expect(data.history[0].date).to.be.equal('2019-01-31');
    expect(data.history[data.history.length - 1].date).to.be.equal('2018-12-14');
  });
});
