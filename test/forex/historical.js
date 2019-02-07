const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const historical = require('../../src/functions/forex/historical');
require('dotenv').config();

chai.use(chaiAsPromised);
const { expect } = chai;

describe('testing forex historical function', () => {
  it('should be rejected with error because base is not provided', () => {
    expect(historical({ API_TOKEN: 'DEMO', convert_to: 'GBP' })).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because API_TOKEN is invalid', () => {
    expect(historical({ base: 'USD', API_TOKEN: '123', convert_to: 'GBP' })).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because an API_TOKEN is not provided', () => {
    expect(historical({ base: 'USD', convert_to: 'GBP' })).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because an convert_to is not provided', () => {
    expect(historical({ base: 'USD', API_TOKEN: 'DEMO' })).to.be.rejectedWith(Error);
  });
  it('should return without error', async () => {
    const data = await historical({ base: 'USD', API_TOKEN: 'DEMO', convert_to: 'GBP' });
    expect(data.symbol).to.be.equal('USDGBP');
    expect(data).to.have.property('history');
  });
});
