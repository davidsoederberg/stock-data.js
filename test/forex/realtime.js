const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const realtime = require('../../src/functions/forex/realtime');
require('dotenv').config();

const API_TOKEN_ENV = process.env.API_TOKEN_TEST;


chai.use(chaiAsPromised);
const { expect } = chai;

describe('testing forex realtime function', () => {
  it('should be rejected with error because base is not provided', () => {
    expect(realtime({ API_TOKEN: 'DEMO' })).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because API_TOKEN is invalid', () => {
    expect(realtime({ base: 'USD', API_TOKEN: '123' })).to.be.rejectedWith(Error);
  });
  it('should be rejected with error because an API_TOKEN is not provided', () => {
    expect(realtime({ base: 'USD' })).to.be.rejectedWith(Error);
  });
  it('should return without error', async () => {
    const data = await realtime({ base: 'USD', API_TOKEN: API_TOKEN_ENV });
    expect(data.base).to.be.equal('USD');
    expect(data).to.have.property('data');
    expect(data).to.have.property('symbols_returned');
  });
});
