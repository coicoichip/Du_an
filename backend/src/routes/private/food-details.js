const router = require('express').Router();
const knex = require('../../knex');
const { validateCustomer, validateOwner } = require('../../middlewares/middlewarAuthorize');
const { handleAPIResponse } = require('../../common/handleAPIResponse');

router.route('/api/restaurants/:restaurant_id/foods/:food_id')
  .get(validateCustomer, async (req, res, next) => {
    const { restaurant_id, food_id } = req.params;
    if (!restaurant_id || !food_id) return handleAPIResponse(res, 400, 'restaurant_id && food_id required');

    try {
      const food = await knex('foods').first().where({ restaurant_id, id: food_id });
      return handleAPIResponse(res, 200, food);
    } catch (e) {
      next(e);
    }
  }).put(validateOwner, async (req, res, next) => {
    const { restaurant_id, food_id } = req.params;
    if (!restaurant_id || !food_id) return handleAPIResponse(res, 400, 'restaurant_id && food_id required');

    try {
      let food = await knex('foods').first().where({ restaurant_id, id: food_id });
      if (!food) return handleAPIResponse(res, 404, 'food_id not exist');
      const update_data = {};
      ['name', 'price', 'status', 'img_url', 'description'].forEach(param => {
        if (req.body[param]) update_data[param] = req.body[param];
      });
      await knex('foods')
        .update(update_data)
        .where({ restaurant_id, id: food_id });
      food = await knex('foods').first().where({ restaurant_id, id: food_id });

      return handleAPIResponse(res, 200, food);
    } catch (e) {
      next(e);
    }
  }).delete(validateOwner, async (req, res, next) => {
    const { restaurant_id, food_id } = req.params;
    if (!restaurant_id || !food_id) return handleAPIResponse(res, 400, 'restaurant_id && food_id required');

    try {
      const food = await knex('foods').first().where({ restaurant_id, id: food_id });
      if (!food) return handleAPIResponse(res, 404, 'food_id not exist');

      await knex('foods').delete().where({ restaurant_id, id: food_id });
      return handleAPIResponse(res, 200);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
