const router = require('express').Router();
const knex = require('../../knex');
const { validateCustomer } = require('../../middlewares/middlewarAuthorize');
const { handleAPIResponse } = require('../../common/handleAPIResponse');

router.route('/api/restaurants/:restaurant_id/comments')
  .get(validateCustomer, async (req, res, next) => {
    const { restaurant_id } = req.params;
    if (!restaurant_id) return handleAPIResponse(res, 400, 'restaurant_id required');

    try {
      const comments = await knex('comments')
        .first('users.email', 'users.name', 'users.phone', 'comments.id', 'comments.content', 'comments.user_id', 'comments.create_time')
        .join('users', 'users.user_id', 'comments.user_id')
        .where({ restaurant_id });

      return handleAPIResponse(res, 200, comments);
    } catch (e) {
      next(e);
    }
  }).post(validateCustomer, async (req, res, next) => {
    const { user_id } = req.session;
    const { restaurant_id } = req.params;
    const { content } = req.body;
    if (!restaurant_id || !content) return handleAPIResponse(res, 400, 'restaurant_id && content required');

    try {
      await knex('comments').insert({ user_id, content, restaurant_id });
      console.log(user_id, typeof user_id);
      const comment = await knex('comments')
        .first('comments.id', 'users.email', 'users.name', 'users.phone', 'comments.content', 'comments.user_id', 'comments.create_time')
        .join('users', 'users.user_id', 'comments.user_id')
        .where({ 'comments.user_id': user_id, content, restaurant_id: parseInt(restaurant_id) })
        .orderBy('comments.create_time', 'desc');

      return handleAPIResponse(res, 200, comment);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
