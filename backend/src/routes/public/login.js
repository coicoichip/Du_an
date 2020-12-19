/* eslint-disable require-atomic-updates */
const route = require('express').Router();
const knex = require('../../knex');
const { handleAPIResponse } = require('../../common/handleAPIResponse');

route('/api/login')
  .post(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return handleAPIResponse(res, 400, 'email && password required');
    try {
      //
      const [user, admin] = await Promise.all(
        ['users', 'admins'].map(table => knex(table).first().where({ email, password }))
      );
      if (admin || user) {
        Object.assign(req.session, {
          id: admin ? admin.id : user.id,
          position: admin ? 'admin' : user.position,
        });
        return handleAPIResponse(res, 200);
      }
      return handleAPIResponse(res, 404, 'email || password not exist');
    } catch (e) {
      next(e);
    }
  });

module.exports = route;
