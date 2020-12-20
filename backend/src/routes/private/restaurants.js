const router = require('express').Router();
const knex = require('../../knex');
const { validateCustomer, validateOwner } = require('../../middlewares/middlewarAuthorize');
const { handleAPIResponse } = require('../../common/handleAPIResponse');

router.route('/api/restaurants')
  .get(validateCustomer, async (req, res, next) => {
    const { restaurant_name } = req.query;

    try {
      let restaurants = knex('restaurants').where({ status: 1 });
      if (restaurant_name) restaurants.andWhere('name', 'like', `%${restaurant_name}%`);
      restaurants = await restaurants;

      return handleAPIResponse(res, 200, restaurants);
    } catch (e) {
      next(e);
    }
  }).post(validateOwner, async (req, res, next) => {
    const { user_id } = req.session;
    const { name, address, phone, open_time, close_time, email } = req.body;
    ['name', 'address', 'phone', 'open_time', 'close_time', 'email'].forEach(field => {
      if (!req.body[field]) return handleAPIResponse(res, 400, `${field} required`);
    });

    try {
      const status = 1;
      await knex('restaurants').insert({ name, address, phone, manager_id: user_id, open_time, close_time, email, status });
      const restaurant = await knex('restaurants')
        .first()
        .where({ name, address, phone, manager_id: user_id, open_time, close_time, email, status })
        .orderBy('id', 'desc');

      return handleAPIResponse(res, 200, restaurant);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
