const router = require('express').Router();
const knex = require('../../knex');
const { validateCustomer } = require('../../middlewares/middlewarAuthorize');
const { handleAPIResponse } = require('../../common/handleAPIResponse');

router.route('/api/restaurants/:restaurant_id/rates')
  .get(validateCustomer, async (req, res, next) => {
    const { restaurant_id } = req.params;
    if (!restaurant_id) return handleAPIResponse(res, 400, 'restaurant_id required');

    try {
      const [rates, avg] = await Promise.all([
        knex('rates').where({ restaurant_id })
          .join('users', 'users.user_id', 'rates.user_id')
          .select('users.email', 'users.name', 'users.phone', 'rates.star'),
        knex('rates').where({ restaurant_id }).first(knex.raw('AVG(star) as avg')),
      ]);
      return handleAPIResponse(res, 200, { rates, avg: avg.avg });
    } catch (e) {
      next(e);
    }
  }).post(validateCustomer, async (req, res, next) => {
    const { user_id } = req.session;
    const { restaurant_id } = req.params;
    const { star } = req.body;
    if (!restaurant_id || !star) return handleAPIResponse(res, 400, 'restaurant_id && star required');
    if (1 > star || star > 5) return handleAPIResponse(res, 400, '1 <= star(int) <= 5');

    try {
      const rate = await knex('rates').first().where({ restaurant_id, user_id });
      if (rate) return handleAPIResponse(res, 409, 'you have already rated');
      await knex('rates').insert({ user_id, restaurant_id, star });

      return handleAPIResponse(res, 200);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
