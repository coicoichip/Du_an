/* eslint-disable require-atomic-updates */
const router = require('express').Router();
const knex = require('knex');
const { validateSession } = require('../../middlewares/middlewarAuthorize');
const { handleAPIResponse } = require('../../common/handleAPIResponse');

router.route('/api/restaurants/:restaurant_id/foods')
  .get(validateSession, async (req, res, next) => {
    const { food_name } = req.query;
    const { restaurant_id } = req.params;
    try {
      let foods = knex('foods')
        .where({ restaurant_id });
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
      restaurant_id,
      status,
      img_url,
      description,
    } = req.body;
    if (!name || !price) return handleAPIResponse(res, 400, 'name && price required');
    try {
      //
      await knex('foods')
        .insert({
          name,
          price,
          restaurant_id,
          status,
          img_url,
          description,
        });
      return handleAPIResponse(res, 200);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
