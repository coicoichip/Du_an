const router = require('express').Router();
const knex = require('../../knex');
const { validateCustomer } = require('../../middlewares/middlewarAuthorize');
const { handleAPIResponse } = require('../../common/handleAPIResponse');

router.route('/api/bills')
  .get(validateCustomer, async (req, res, next) => {
    const { user_id } = req.session;

    try {
        const bills = await knex('bills').where({ recipient_id: user_id });
        const bill_details = await knex('bill_detail').whereIn('bill_id', knex('bills').select('id').where({ recipient_id: user_id }));
        const total_bill_details = bills.map(bill => {
          const bill_detail = bill_details.filter(detail => detail.bill_id === bill.id);
          return { ...bill, bill_detail };
        });
        return handleAPIResponse(res, 200, total_bill_details);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
