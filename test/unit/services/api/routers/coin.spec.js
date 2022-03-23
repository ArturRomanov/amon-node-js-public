const path = require('path');
const sinon = require('sinon');
const Router = require('@koa/router');
const { expect } = require('chai');
const { sequelizeMockingMocha } = require('sequelize-mocking');
const CoinRouter = require(path.join(srcDir, '/services/api/routers/coin'));
const config = require(path.join(srcDir, '../config'));
const DB = require(path.join(srcDir, 'modules/db'));

describe('Router: coin', () => {
  sequelizeMockingMocha(DB.sequelize, [path.resolve(srcDir, '../test/mocks/coins.json')], { logging: false });

  let sandbox = null;

  beforeEach(async () => {
    sandbox = sinon.createSandbox();
    this.get = sandbox.stub(Router.prototype, 'get');
  });

  afterEach(() => {
    config.DEMO_ACCOUNT = null;
    sandbox && sandbox.restore();
  });

  it('Should put createCoin', async () => {
    const ctx = {
      request: {
        body: {
          name: 'Bitcoin Cash',
          code: 'BCH',
        },
      },
    };

    await CoinRouter.createCoin(ctx);

    expect(ctx.body).to.be.an('object');
  });

  it('Should get getCoinByCode', async () => {
    const ctx = {
      params: {
        coinCode: 'BTC',
      },
    };

    await CoinRouter.getCoinByCode(ctx);

    expect(ctx.body).to.be.an('object');
  });
});
