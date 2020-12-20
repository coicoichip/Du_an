const router = require('express').Router();
const knex = require('../../knex');
const { validateCustomer } = require('../../middlewares/middlewarAuthorize');
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
  })
  // .put(validateCustomer, async (req, res, next) => {
  //   const {
  //     email,
  //     name,
  //     phone,
  //     address,
  //   } = req.session;
  //   const { restaurant_id } = req.params;
  //   const { bills, ship_price, note } = req.body;
  //   if (!restaurant_id || !bills || !ship_price || !note) return handleAPIResponse(res, 400, 'restaurant_id(int) && bills(array) && ship_price(int) && note(string) required');

  //   try {
  //     const bill_code = '';
  //     //
  //     let total = 0;
  //     const total_bill_details = bills.map(async ({ food_id, quantity }) => {
  //       const { price } = await knex('foods').first().where({ id: food_id });
  //       const amount = price * quantity;
  //       total += amount;
  //       return { food_id, quantity, amount };
  //     });

  //     total = total + ship_price || 0;
  //     await knex('bills')
  //       .insert({
  //         bill_code,
  //         restaurant_id,
  //         status: 1,
  //         ship_price: ship_price || 0,
  //         total,
  //         recipient_name: name,
  //         recipient_email: email,
  //         recipient_phone: phone,
  //         recipient_address: address,
  //         note,
  //       });
  //     const { id: bill_id } = await knex('bills').first().where({ bill_code });
  //     await Promise.all(total_bill_details.map(bill_detail => knex('bill_detail').insert({ ...bill_detail, bill_id })));

  //     const bill = await knex('bills').first().where({ bill_code });
  //     const bill_detail = await knex('bill_detail').where({ bill_id: bill.id });

  //     return handleAPIResponse(res, 200, { ...bill, bill_detail });
  //   } catch (e) {
  //     next(e);
  //   }
  // })
  .delete(validateCustomer, async (req, res, next) => {
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
