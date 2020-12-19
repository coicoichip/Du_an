/* eslint-disable require-atomic-updates */
const router = require('express').Router();
const knex = require('knex');
const { validateCustomer } = require('../../middlewares/middlewarAuthorize');
const { handleAPIResponse } = require('../../common/handleAPIResponse');

router.route('/api/foods')
  .get(validateCustomer, async (req, res, next) => {
    try {
      const restaurants = await knex('restaurants');
      return handleAPIResponse(res, 200, restaurants);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
