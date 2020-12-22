const router = require('express').Router();
const knex = require('../../knex');
const { validateCustomer, validateOwner } = require('../../middlewares/middlewarAuthorize');
const { handleAPIResponse } = require('../../common/handleAPIResponse');

router.route('/api/restaurants/:restaurant_id')
  .get(validateCustomer, async (req, res, next) => {
    const { restaurant_id } = req.params;
    if (!restaurant_id) return handleAPIResponse(res, 400, 'restaurant_id required');

    try {
      const restaurant = await knex('restaurants').first().where({ id: restaurant_id });
      return handleAPIResponse(res, 200, restaurant);
    } catch (e) {
      next(e);
    }
  }).put(validateOwner, async (req, res, next) => {
    const { user_id } = req.session;
    const { restaurant_id } = req.params;
    const fields = ['name', 'address', 'phone', 'open_time', 'close_time', 'email', 'status', 'img_url'];
    const update_data = {};
    fields.forEach(field => {
      if (req.body[`${field}`]) update_data[`${field}`] = req.body[`${field}`];
    });

    try {
      await knex('restaurants').update(update_data).where({ id: restaurant_id, manager_id: user_id });
      return handleAPIResponse(res, 200);
    } catch (e) {
      next(e);
    }
  }).delete(validateOwner, async (req, res, next) => {
    const { user_id } = req.session;
    const { restaurant_id } = req.params;
    if (!restaurant_id) return handleAPIResponse(res, 400, 'restaurant_id required');

    try {
      await knex('restaurants').delete().where({ id: restaurant_id, manager_id: user_id });
      return handleAPIResponse(res, 200);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
