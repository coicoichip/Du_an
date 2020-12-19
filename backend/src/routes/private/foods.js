/* eslint-disable require-atomic-updates */
const router = require('express').Router();
const knex = require('knex');
const { validateSession } = require('../../middlewares/middlewarAuthorize');
const { handleAPIResponse } = require('../../common/handleAPIResponse');

router.route('/api/foods')
  .get(validateSession, async (req, res, next) => {
    const { food_name } = req.query;
    try {
      let foods = knex('foods');
      if (food_name) foods.where('name', 'like', `%${food_name}%`);
      foods = await foods;
      return handleAPIResponse(res, 200, foods);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
