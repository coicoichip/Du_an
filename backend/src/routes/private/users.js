const router = require('express').Router();
const knex = require('../../knex');
const { validateCustomer, validateAdmin } = require('../../middlewares/middlewarAuthorize');
const { handleAPIResponse } = require('../../common/handleAPIResponse');

router.route('/api/users')
  .get(validateAdmin, async (req, res, next) => {
    const { position } = req.body;
    try {
      let users = knex('users');
      if (position) users.where({ position });
      users = await users;
      return handleAPIResponse(res, 200, users);
    } catch (e) {
      next(e);
    }
  }).post(validateAdmin, async (req, res, next) => {
    const { email, name, password, phone, address } = req.body;
    if (!email || !password) return handleAPIResponse(res, 400, 'email && password required');

    try {
      let user = await knex('users').first().where({ email });
      if (user) return handleAPIResponse(res, 400, 'email exist');
      await knex('users').insert({ email, name, password, phone, address, position: 'customer' });
      user = await knex('users').first().where({ email, name, password, phone, address }).orderBy('user_id', 'desc');
      return handleAPIResponse(res, 200, user);
    } catch (e) {
      next(e);
    }
  }).put(validateCustomer, async (req, res, next) => {
    const { user_id, email } = req.session;
    // const { email, name, password, phone, address } = req.body;

    try {
      let user = await knex('users').first().where({ email });
      if (user) return handleAPIResponse(res, 400, 'email exist');
      const update_data = {};
      ['email', 'name', 'password', 'phone', 'address'].forEach(field => {
        if (req.body[field]) update_data[field] = req.body[field];
      });

      await knex('users')
        .update(update_data)
        .where({ user_id });
      user = await knex('users').first().where({ user_id });
      Object.assign(req.session, user);
      delete user.password;

      return handleAPIResponse(res, 200, user);
    } catch (e) {
      next(e);
    }
  }).delete(validateAdmin, async (req, res, next) => {
    const { user_id } = req.body;
    if (!user_id) return handleAPIResponse(res, 400, 'user_id required');

    try {
      // const foods = await knex('foods').whereIn('restaurant_id', knex('restaurants').select('id').where({ manager_id: user_id }));
      // if (foods.length > 0) await knex('foods').delete().whereIn('restaurant_id', knex('restaurants').select('id').where({ manager_id: user_id }));
      // const rates = await knex('rates').whereIn('restaurant_id', knex('restaurants').select('id').where({ manager_id: user_id }));
      // if (rates.length > 0) await knex('rates').delete().whereIn('restaurant_id', knex('restaurants').select('id').where({ manager_id: user_id }));
      // const comments = await knex('comments').whereIn('restaurant_id', knex('restaurants').select('id').where({ manager_id: user_id }));
      // if (comments.length > 0) await knex('comments').delete().whereIn('restaurant_id', knex('restaurants').select('id').where({ manager_id: user_id }));
      // const restaurant = await knex('restaurants').first().where({ manager_id: user_id });
      // if (restaurant) await knex('restaurants').delete().where({ manager_id: user_id });
      await knex('users').delete().where({ user_id });

      return handleAPIResponse(res, 200);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
