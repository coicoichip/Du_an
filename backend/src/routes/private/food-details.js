/* eslint-disable require-atomic-updates */
const router = require('express').Router();
const knex = require('knex');
const { validateSession } = require('../../middlewares/middlewarAuthorize');
const { handleAPIResponse } = require('../../common/handleAPIResponse');

router.route('/api/restaurants/:restaurant_id/foods/:food_id')
  .get(validateSession, async (req, res, next) => {
    const { restaurant_id, food_id } = req.params;
    try {
      const food = await knex('foods').first().where({ restaurant_id, id: food_id });
      return handleAPIResponse(res, 200, food);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
