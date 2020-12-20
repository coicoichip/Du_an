const router = require('express').Router();
const knex = require('../../knex');
const { validateCustomer } = require('../../middlewares/middlewarAuthorize');
const { handleAPIResponse } = require('../../common/handleAPIResponse');

router.route('/api/me')
  .get(validateCustomer, async (req, res, next) => {
    const { user_id, position } = req.session;

    try {
      if (position === 'admin') return handleAPIResponse(res, 200);
      const user = await knex('users').first().where({ user_id });

      return handleAPIResponse(res, 200, user);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
