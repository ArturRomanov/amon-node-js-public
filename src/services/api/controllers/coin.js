const errors = require('../../../helpers/errors');
const Models = require('../../../models/pg');
const CoinGecko = require('../../../helpers/coingecko');
const { updatedTimeOlderThanOneHour } = require('../../../helpers/utils');

const CoinController = {
  async createCoin(contextData) {
    const coinCheck = await Models.Coin.findByCoinCode(contextData.code);

    if (coinCheck) {
      errors.assertExposable(false, 'coin_exists');
    } else {
      const coin = await Models.Coin.createCoin(contextData);

      return coin.filterKeys();
    }
  },

  async getCoinByCode(coinCode) {
    const coin = await Models.Coin.findByCoinCode(coinCode);

    errors.assertExposable(coin, 'unknown_coin_code');

    if (coin.price === null || (coin.updatedAt !== null && updatedTimeOlderThanOneHour(coin.updatedAt))) {
      const price = CoinGecko.getPriceCoinGecko(coinCode);

      await coin.update({ price: price.toString(), priceUpdate: Date.now() });

      await coin.save();
    } else {
      errors.assertExposable(false, 'price_updated');
    }

    return coin.filterKeys();
  },
};

module.exports = CoinController;
