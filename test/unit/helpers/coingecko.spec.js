const { expect } = require('chai');
const path = require('path');
const sinon = require('sinon');
const CoinGecko = require(path.join(srcDir, 'helpers/coingecko'));

describe('Helpers: CoinGecko', () => {
  let sandbox = null;

  beforeEach(async () => {
    sandbox = sinon.createSandbox();
  });

  afterEach(async () => {
    sandbox && sandbox.restore();
  });

  describe('getPriceCoinGecko', () => {
    it('Should return String', async () => {
      const price = await CoinGecko.getPriceCoinGecko('BTC');
      expect(price).to.be.a('string');
    });

    it('Should tell about the unknown coin code', async () => {
      expect(CoinGecko.getPriceCoinGecko('BTJ')).to.be.rejectedWith(Error, 'unknown_coin_code');
    });
  });
});
