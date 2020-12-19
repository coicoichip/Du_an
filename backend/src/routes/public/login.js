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
      const [user, admin] = await Promise.all(
        ['users', 'admins'].map(table => knex(table).first().where({ email, password }))
      );
      if (admin || user) {
        Object.assign(req.session, admin ? admin : user);
        return handleAPIResponse(res, 200);
      }
      return handleAPIResponse(res, 400, 'user not exist');
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
