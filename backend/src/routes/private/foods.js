/* eslint-disable require-atomic-updates */
const router = require('express').Router();
const knex = require('../../knex');
const { validateSession } = require('../../middlewares/middlewarAuthorize');
const { handleAPIResponse } = require('../../common/handleAPIResponse');

router.route('/api/restaurants/:restaurant_id/foods')
  .get(validateSession, async (req, res, next) => {
    const { food_name } = req.query;
    const { restaurant_id } = req.params;
    try {
      let foods = knex('foods').where({ restaurant_id });
      if (food_name) foods.andWwhere('name', 'like', `%${food_name}%`);
      foods = await foods;
      return handleAPIResponse(res, 200, foods);
    } catch (e) {
      next(e);
    }
  })
  .post(validateSession, async (req, res, next) => {
    const {
      name,
      price,
      img_url,
      description,
    } = req.body;
    const { restaurant_id } = req.params;
    if (!name || !price || !restaurant_id) return handleAPIResponse(res, 400, 'name && price && restaurant_id required');
    try {
      await knex('foods')
        .insert({
          name,
          price,
          restaurant_id,
          status: 1,
          img_url,
          description,
        });
      const food = await knex('foods')
        .first()
        .where({
          name,
          price,
          restaurant_id,
          status: 1,
          img_url,
          description,
        })
        .orderBy('id', 'desc');
      return handleAPIResponse(res, 200, food);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
