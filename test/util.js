const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const fetchData = require('../src/util/fetchData');
require('dotenv').config();

chai.use(chaiAsPromised);
const { expect } = chai;

describe('testing util functions', () => {
  describe('testing fetchData', () => {
    it('should give error because URL is invalid', () => {
      expect(fetchData('abc', '123', 'xyz')).to.be.rejectedWith(Error);
    });
  });
});
