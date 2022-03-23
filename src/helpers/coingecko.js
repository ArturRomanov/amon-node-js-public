const axios = require('axios');
const errors = require('../helpers/errors');

const CoinGecko = {
  async getPriceCoinGecko(coinCode) {
    try {
      const responseList = await axios({
        method: 'get',
        url: 'https://api.coingecko.com/api/v3/coins/list',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      let filteredList = responseList.data.filter((item) => item.symbol.toUpperCase() === coinCode);

      let response;

      if (filteredList && filteredList[0] && filteredList[0].id) {
        response = await axios({
          method: 'get',
          url: `https://api.coingecko.com/api/v3/coins/${filteredList[0].id}`,
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
      return response.data.market_data.current_price.usd.toString();
    } catch (error) {
      errors.assertExposable(false, 'unknown_coin_code');
    }
  },
};

module.exports = CoinGecko;
