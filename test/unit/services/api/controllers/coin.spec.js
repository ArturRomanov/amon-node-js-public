const { expect } = require('chai');
const path = require('path');
const sinon = require('sinon');
const sequelizeMockingMocha = require('sequelize-mocking').sequelizeMockingMocha;
const CoinController = require(path.join(srcDir, '/services/api/controllers/coin'));
const DB = require(path.join(srcDir, 'modules/db'));

describe('Controller: Coin', () => {
  let sandbox = null;

  sequelizeMockingMocha(DB.sequelize, [path.resolve('test/mocks/coins.json')], { logging: false });

  beforeEach(async () => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox && sandbox.restore();
  });

  describe('createCoin', () => {
    it('should create coin', async () => {
      const coin = await CoinController.createCoin({
        name: 'Bitcoin Cash',
        code: 'BCH',
      });

      expect(coin.name).to.eq('Bitcoin Cash');
      expect(coin.code).to.eq('BCH');
    });

    it('should tell that coin exists', async () => {
      const contextData = {
        name: 'Bitcoin',
        code: 'BTC',
      };

      expect(CoinController.createCoin(contextData)).to.be.rejectedWith(Error, 'coin_exists');
    });
  });

  describe('getCoinByCode', () => {
    it('should get coin by code', async () => {
      const coinCode = 'BTC';
      const coin = await CoinController.getCoinByCode(coinCode);

      expect(coin.code).to.eq(coinCode);
      expect(coin.price).to.be.a('string');
      expect(Object.keys(coin).length).to.eq(3);
    });

    it('should fail get coin by code', async () => {
      const coinCode = 'AMN';
      expect(CoinController.getCoinByCode(coinCode)).to.be.rejectedWith(Error, 'unknown_coin_code');
    });

    it('should tell that price updated', async () => {
      const coinCode = 'BTC';
      const coin = await CoinController.getCoinByCode(coinCode);

      expect(CoinController.getCoinByCode(coinCode)).to.be.rejectedWith(Error, 'price_updated');
    });
  });
});
