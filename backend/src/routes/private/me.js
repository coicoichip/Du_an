/* eslint-disable require-atomic-updates */
const router = require('express').Router();
const knex = require('../../knex');
const { validateSession } = require('../../middlewares/middlewarAuthorize');
const { handleAPIResponse } = require('../../common/handleAPIResponse');

router.route('/api/me')
  .get(validateSession, async (req, res, next) => {
    const { id, position } = req.session;
    try {
      //
      if (position === 'admin') return handleAPIResponse(res, 200);
      const user = await knex('users').first().where({ id });
      return handleAPIResponse(res, 200, user);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
