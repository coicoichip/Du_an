/* eslint-disable require-atomic-updates */
const router = require('express').Router();
const knex = require('../../knex');
const { validateSession } = require('../../middlewares/middlewarAuthorize');
const { handleAPIResponse } = require('../../common/handleAPIResponse');

router.route('/api/me')
  .get(validateSession, async (req, res, next) => {
    const { user_id, admin_id, position } = req.session;
    try {
      //
      const id = position === 'admin' ? admin_id : user_id;
      if (position === 'admin') return handleAPIResponse(res, 200);
      const user = await knex('users').first().where({ id });
      return handleAPIResponse(res, 200, user);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
