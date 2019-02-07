const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const historicalDay = require('../../src/functions/forex/historicalDay');
require('dotenv').config();

chai.use(chaiAsPromised);
const { expect } = chai;

describe('testing forex historicalDay function', () => {
  it('should be rejected with error because symbols are not provided', () => {
    expect(historicalDay({ API_TOKEN: 'DEMO', options: { date: '2018-01-02' } })).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because API_TOKEN is invalid', () => {
    expect(historicalDay({ base: 'USD', API_TOKEN: '123', options: { date: '2018-01-02' } })).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because an API_TOKEN is not provided', () => {
    expect(historicalDay({ base: 'USD', options: { date: '2018-01-02' } })).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because date not provided', () => {
    expect(historicalDay({ base: 'USD', API_TOKEN: 'DEMO' })).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because date is invalid', () => {
    expect(historicalDay({ base: 'USD', API_TOKEN: 'demo', options: { date: '2018-01' } })).to.be.rejectedWith(Error);
  });
  it('should return data of one stock without error', async () => {
    const data = await historicalDay({ base: 'USD', API_TOKEN: 'DEMO', options: { date: '2018-08-31' } });
    expect(data.base).to.be.equal('USD');
    expect(data.date).to.be.equal('2018-08-31');
    expect(data).to.have.property('data');
  });
});
