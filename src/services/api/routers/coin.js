const Joi = require('joi');
const Router = require('@koa/router');
const CoinController = require('../controllers/coin');
const { validateParams } = require('../../../helpers/validation');

const CoinRouter = {
  schemaGetByCoinCode: Joi.object({
    coinCode: Joi.string().min(3).uppercase().max(5),
  }),

  schemaCreateCoin: Joi.object({
    name: Joi.string().min(3).max(50),
    code: Joi.string().min(3).uppercase().max(5),
  }),

  async createCoin(ctx) {
    const contextData = {
      name: ctx.request.body.name,
      code: ctx.request.body.code,
    };

    const formattedContextData = await validateParams(CoinRouter.schemaCreateCoin, contextData);

    ctx.body = await CoinController.createCoin(formattedContextData);
  },

  async getCoinByCode(ctx) {
    const params = {
      coinCode: ctx.params.coinCode,
    };

    const formattedParams = await validateParams(CoinRouter.schemaGetByCoinCode, params);

    ctx.body = await CoinController.getCoinByCode(formattedParams.coinCode);
  },

  router() {
    const router = Router();

    /**
     * @api {put} / Put createCoin
     * @apiName createCoin
     * @apiGroup Status
     * @apiDescription Put createCoin
     *
     * @apiSampleRequest /
     *
     */
    router.put('/createCoin', CoinRouter.createCoin);

    /**
     * @api {get} / Get coinCode
     * @apiName coinCode
     * @apiGroup Status
     * @apiDescription Get coinCode
     *
     * @apiSampleRequest /
     *
     */
    router.get('/:coinCode', CoinRouter.getCoinByCode);

    return router;
  },
};

module.exports = CoinRouter;
