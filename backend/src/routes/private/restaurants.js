/* eslint-disable require-atomic-updates */
const router = require('express').Router();
const knex = require('../../knex');
const { validateSession, validateCustomer } = require('../../middlewares/middlewarAuthorize');
const { handleAPIResponse } = require('../../common/handleAPIResponse');

router.route('/api/restaurants')
  .get(validateSession, async (req, res, next) => {
    const { restaurant_name } = req.query;
    try {
      let restaurants = knex('restaurants').where({ status: 1 });
      if (restaurant_name) restaurants.andWhere('name', 'like', `%${restaurant_name}%`);
      restaurants = await restaurants;
      return handleAPIResponse(res, 200, restaurants);
    } catch (e) {
      next(e);
    }
  })
  .post(validateCustomer, async (req, res, next) => {
    const { user_id } = req.session;
    const {
      name,
      address,
      phone,
      open_time,
      close_time,
      email,
    } = req.body;
    const fields = ['name', 'address', 'phone', 'open_time', 'close_time', 'email'];
    fields.forEach(field => {
      if (!req.body[`${field}`]) return handleAPIResponse(res, 400, `${field} required`);
    });
    try {
      const status = 1;
      let [restaurant] = await knex('restaurants')
        .insert({
          name,
          address,
          phone,
          manager_id: user_id,
          open_time,
          close_time,
          email,
          status,
        })
        .returning('*');
      restaurant = await knex('restaurants')
        .first()
        .where({
          name,
          address,
          phone,
          manager_id: user_id,
          open_time,
          close_time,
          email,
          status,
        })
        .orderBy('id', 'desc');
      return handleAPIResponse(res, 200, restaurant);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
