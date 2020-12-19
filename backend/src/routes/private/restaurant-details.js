/* eslint-disable require-atomic-updates */
const router = require('express').Router();
const knex = require('../../knex');
const { validateSession } = require('../../middlewares/middlewarAuthorize');
const { handleAPIResponse } = require('../../common/handleAPIResponse');

router.route('/api/restaurant/:restaurant_id')
  .get(validateSession, async (req, res, next) => {
    const { restaurant_id } = req.params;
    try {
      const restaurant = await knex('restaurants')
        .first()
        .where({ id: restaurant_id });
      return handleAPIResponse(res, 200, restaurant);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
