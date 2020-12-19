/* eslint-disable require-atomic-updates */
const router = require('express').Router();
const knex = require('../../knex');
const { validateSession } = require('../../middlewares/middlewarAuthorize');
const { handleAPIResponse } = require('../../common/handleAPIResponse');

router.route('/api/restaurants')
  .get(validateSession, async (req, res, next) => {
    const { restaurant_name } = req.body;
    try {
      let restaurants = knex('restaurants');
      if (restaurant_name) restaurants.where('name', 'like', `%${restaurant_name}%`);
      restaurants = await restaurants;
      return handleAPIResponse(res, 200, restaurants);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
