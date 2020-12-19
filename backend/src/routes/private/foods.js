/* eslint-disable require-atomic-updates */
const route = require('express').Router();
const knex = require('knex');
const { validateCustomer } = require('../../middlewares/middlewarAuthorize');
const { handleAPIResponse } = require('../../common/handleAPIResponse');

route('/api/restaurants')
  .get(validateCustomer, async (req, res, next) => {
    try {
      const restaurants = await knex('restaurants');
      return handleAPIResponse(res, 200, restaurants);
    } catch (e) {
      next(e);
    }
  });

module.exports = route;
