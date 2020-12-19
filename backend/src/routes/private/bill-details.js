/* eslint-disable require-atomic-updates */
const router = require('express').Router();
const knex = require('../../knex');
const { validateSession } = require('../../middlewares/middlewarAuthorize');
const { handleAPIResponse } = require('../../common/handleAPIResponse');

router.route('/api/restaurants/:restaurant_id/bills/:bill_id')
  .get(validateSession, async (req, res, next) => {
    const { restaurant_id, bill_id } = req.params;
    if (!restaurant_id || !bill_id) return handleAPIResponse(res, 400, 'restaurant_id && bill_id required');
    try {
      //
      const bill = await knex('bills').first().where({ restaurant_id, id: bill_id });
      if (!bill) return handleAPIResponse(res, 404, 'bill_id not exist');
      const bill_detail = await knex('bill_detail').where({ bill_id: bill.id });

      return handleAPIResponse(res, 200, { ...bill, bill_detail });
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
