const router = require('express').Router();
const { v4 } = require('uuid');
const knex = require('../../knex');
const { validateCustomer } = require('../../middlewares/middlewarAuthorize');
const { handleAPIResponse } = require('../../common/handleAPIResponse');
const { triggerNotification } = require('../../socket');

router.route('/api/restaurants/:restaurant_id/bills')
  .get(validateCustomer, async (req, res, next) => {
    const { user_id } = req.session;
    const { restaurant_id } = req.params;
    const { status } = req.body;
    if (!restaurant_id) return handleAPIResponse(res, 400, 'restaurant_id required');
    if (status && ![0, 1].includes(status)) return handleAPIResponse(res, 400, 'status === 0 || 1');

    try {
      const restaurant = await knex('restaurants').first().where({ id: restaurant_id });
      if (!restaurant) return handleAPIResponse(res, 404, 'restaurant_id not exist');
      let bills = knex('bills').where({ restaurant_id });
      if ([0, 1].includes(status)) bills = bills.andWhere({ status });
      if (user_id !== restaurant.manager_id) bills = bills.andWhere({ recipient_id: user_id });
      bills = await bills;

      return handleAPIResponse(res, 200, bills);
    } catch (e) {
      next(e);
    }
  }).post(validateCustomer, async (req, res, next) => {
    const { user_id, email, name, phone, address } = req.session;
    const { restaurant_id } = req.params;
    const { bills, ship_price, note } = req.body;
    if (!restaurant_id || !bills || !ship_price) return handleAPIResponse(res, 400, 'restaurant_id(int) && bills(array) && ship_price(int) required');

    try {
      const restaurant = await knex('restaurants').first().where({ id: restaurant_id });
      if (!restaurant) return handleAPIResponse(res, 404, 'restaurant_id not exist');

      const bill_code = v4();
      let total = 0;
      const foods = await Promise.all(bills.map(({ food_id }) =>
        knex('foods').first().where({ id: food_id }),
      ));
      const total_bill_details = bills.map(({ food_id, quantity }, idx) => {
        const amount = foods[idx].price * quantity;
        total += amount;
        return { food_id, quantity, amount };
      });

      total = total + ship_price || 0;
      await knex('bills')
        .insert({
          bill_code,
          restaurant_id,
          status: 1,
          ship_price: ship_price || 0,
          total,
          recipient_id: user_id,
          recipient_name: name,
          recipient_email: email,
          recipient_phone: phone,
          recipient_address: address,
          note,
        });
      const { id: bill_id } = await knex('bills').first().where({ bill_code });
      await Promise.all(total_bill_details.map(bill_detail => knex('bill_detail').insert({ ...bill_detail, bill_id })));

      const bill = await knex('bills').first().where({ bill_code });
      const bill_detail = await knex('bill_detail').where({ bill_id: bill.id });

      const result = { ...bill, bill_detail };
      const bill_path = `/api/restaurants/${restaurant_id}/bills/${bill_id}`;
      triggerNotification(user_id, { ...result, bill_path });
      triggerNotification(restaurant.manager_id, { ...result, bill_path });

      return handleAPIResponse(res, 200, result);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
