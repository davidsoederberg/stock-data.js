const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const search = require('../src/functions/search');
require('dotenv').config();

chai.use(chaiAsPromised);
const { expect } = chai;

describe('testing util', () => {
  it('should be rejected with error because a symbol is not provided', () => {
    expect(search({ API_TOKEN: 'DEMO' })).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because API_TOKEN is invalid', () => {
    expect(search({ search_term: 'AAPL', API_TOKEN: '123' })).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because a API_TOKEN is not provided', () => {
    expect(search({ search_term: 'AAPL' })).to.be.rejectedWith(Error);
  });
  it('should return without error', async () => {
    const data = await search({
      search_term: 'AAPL', API_TOKEN: 'DEMO', search_by: 'symbol,name', limit: 50, page: 1
    });
    expect(data.total_returned).to.be.equal(5);
    expect(data.total_results).to.be.equal(5);
    expect(data.data[0].symbol).to.be.equal('AAPL');
  });
});
