const router = require('express').Router();
const knex = require('../../knex');
const { validateCustomer, validateOwner } = require('../../middlewares/middlewarAuthorize');
const { handleAPIResponse } = require('../../common/handleAPIResponse');

router.route('/api/restaurants/:restaurant_id/bills/:bill_id')
  .get(validateCustomer, async (req, res, next) => {
    const { user_id, position } = req.session;
    const { restaurant_id, bill_id } = req.params;
    if (!restaurant_id || !bill_id) return handleAPIResponse(res, 400, 'restaurant_id && bill_id required');

    try {
      const [restaurant, bill] = await Promise.all([
        knex('restaurants').first().where({ id: restaurant_id }),
        knex('bills').first().where({ restaurant_id, id: bill_id }),
      ]);
      if (!bill) return handleAPIResponse(res, 404, 'bill_id not exist');
      if (!restaurant) return handleAPIResponse(res, 404, 'restaurant_id not exist');
      if (restaurant.manager_id !== user_id && bill.recipient_id !== user_id && position !== 'admin') return handleAPIResponse(res, 403, 'forbidden');

      const bill_detail = await knex('bill_detail').where({ bill_id: bill.id });

      return handleAPIResponse(res, 200, { ...bill, bill_detail });
    } catch (e) {
      next(e);
    }
  }).put(validateOwner, async (req, res, next) => {
    const { user_id } = req.session;
    const { restaurant_id, bill_id } = req.params;
    const { status } = req.body;
    if (!restaurant_id || !bill_id) return handleAPIResponse(res, 400, 'restaurant_id && bill_id required');
    if (![0, 1].includes(status)) return handleAPIResponse(res, 400, '1 <= status <= 5');

    try {
      const [restaurant, bill] = await Promise.all([
        knex('restaurants').first().where({ id: restaurant_id }),
        knex('bills').first().where({ restaurant_id, id: bill_id }),
      ]);
      if (!bill) return handleAPIResponse(res, 404, 'bill_id not exist');
      if (!restaurant) return handleAPIResponse(res, 404, 'restaurant_id not exist');
      if (user_id !== restaurant.manager_id) return handleAPIResponse(res, 403, 'forbidden');

      await knex('bills').update({ status }).where({ id: bill_id });
      const bill1 = await knex('bills').first().where({ id: bill_id });

      return handleAPIResponse(res, 200, bill1);
    } catch (e) {
      next(e);
    }
  }).delete(validateOwner, async (req, res, next) => {
    const { user_id, position } = req.session;
    const { restaurant_id, bill_id } = req.params;
    if (!restaurant_id || !bill_id) return handleAPIResponse(res, 400, 'restaurant_id && bill_id required');

    try {
      const [restaurant, bill] = await Promise.all([
        knex('restaurants').first().where({ id: restaurant_id }),
        knex('bills').first().where({ restaurant_id, id: bill_id }),
      ]);
      if (!restaurant) return handleAPIResponse(res, 404, 'restaurant_id not exist');
      if (!bill) return handleAPIResponse(res, 404, 'bill_id not exist');
      if (restaurant.manager_id !== user_id && position !== 'admin') return handleAPIResponse(res, 403, 'forbidden');

      await Promise.all([
        knex('bills').delete().where({ restaurant_id, id: bill_id }),
        knex('bill_detail').delete().where({ bill_id }),
      ]);

      return handleAPIResponse(res, 200);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
