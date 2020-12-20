/* eslint-disable require-atomic-updates */
const router = require('express').Router();
const knex = require('../../knex');
const { handleAPIResponse } = require('../../common/handleAPIResponse');

router.route('/api/login')
  .post(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return handleAPIResponse(res, 400, 'email && password required');
    try {
      //
      const user = await knex('users').first().where({ email });
      if (!user) return handleAPIResponse(res, 400, 'user not exist');
      Object.assign(req.session, user);
      return handleAPIResponse(res, 200);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
