const router = require('express').Router();
const knex = require('../../knex');
const { validateCustomer, validateAdmin } = require('../../middlewares/middlewarAuthorize');
const { handleAPIResponse } = require('../../common/handleAPIResponse');

router.route('/api/users')
  .get(validateAdmin, async (req, res, next) => {
    try {
      const users = await knex('users');
      return handleAPIResponse(res, 200, users);
    } catch (e) {
      next(e);
    }
  }).put(validateCustomer, async (req, res, next) => {
    const { user_id } = req.session;
    const { email, name, password, phone, address } = req.body;

    try {
      const update_data = {};
      [email, name, password, phone, address].forEach(field => {
        if (req.body[field]) update_data[field] = req.body[field];
      });

      await knex('users')
        .update(update_data)
        .where({ user_id });
      const user = await knex('users').first().where({ user_id });
      delete user.password;

      return handleAPIResponse(res, 200, user);
    } catch (e) {
      next(e);
    }
  }).delete(validateAdmin, async (req, res, next) => {
    const { user_id } = req.body;
    if (!user_id) return handleAPIResponse(res, 400, 'user_id required');

    try {
      await knex('users').delete().where({ user_id });
      return handleAPIResponse(res, 200);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
