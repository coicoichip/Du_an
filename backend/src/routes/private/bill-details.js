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
      if (!restaurant) return handleAPIResponse(res, 404, 'restaurant_id not exist');
      if (!bill) return handleAPIResponse(res, 404, 'bill_id not exist');
      if (restaurant.manager_id !== user_id && bill.recipient_id !== user_id && position !== 'admin') return handleAPIResponse(res, 403, 'forbidden');

      const bill_detail = await knex('bill_detail').where({ bill_id: bill.id });

      return handleAPIResponse(res, 200, { ...bill, bill_detail });
    } catch (e) {
      next(e);
    }
  }).put(validateCustomer, async (req, res, next) => {
    const { user_id, position } = req.session;
    const { restaurant_id, bill_id } = req.params;
    const { status, ship_price, bill_detail } = req.body;
    if (!restaurant_id || !bill_id) return handleAPIResponse(res, 400, 'restaurant_id && bill_id required');

    try {
      const [restaurant, bill] = await Promise.all([
        knex('restaurants').first().where({ id: restaurant_id }),
        knex('bills').first().where({ restaurant_id, id: bill_id }),
      ]);
      if (!restaurant) return handleAPIResponse(res, 404, 'restaurant_id not exist');
      if (!bill) return handleAPIResponse(res, 404, 'bill_id not exist');
      if (restaurant.manager_id !== user_id && bill.recipient_id !== user_id && position !== 'admin') return handleAPIResponse(res, 403, 'forbidden');
      if (position === 'customer' && ([0, 1].includes(status) || ship_price)) return handleAPIResponse(res, 403, 'status && customer && ship_price forbidden');

      await knex('bill_detail').delete().where({ bill_id });
      const update_data = {};
      ['status', 'ship_price', 'note', 'recipient_id', 'recipient_name', 'recipient_email', 'recipient_phone', 'recipient_address'].forEach(field => {
        if (req.body[field]) update_data[field] = req.body[field];
      });

      let total = 0;
      const total_bill_details = bill_detail.map(async ({ food_id, quantity }) => {
        const { price } = await knex('foods').first().where({ id: food_id });
        const amount = price * quantity;
        total += amount;
        return { bill_id: bill.id, food_id, quantity, amount };
      });
      Object.assign(update_data, { total });

      await knex('bills')
        .update(update_data)
        .where({ id: bill_id });
      await Promise.all(total_bill_details.map(bill_detail1 =>
        knex('bill_detail').insert(bill_detail1),
      ));

      const bill1 = await knex('bills').first().where({ bill_code: bill.bill_code });
      const bill_detail1 = await knex('bill_detail').where({ bill_id: bill.id });

      const result = { ...bill1, bill_detail1 };

      return handleAPIResponse(res, 200, result);
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
      if (restaurant.manager_id !== user_id && bill.recipient_id !== user_id && position !== 'admin') return handleAPIResponse(res, 403, 'forbidden');

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
