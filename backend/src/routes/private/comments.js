const router = require('express').Router();
const knex = require('../../knex');
const { validateCustomer } = require('../../middlewares/middlewarAuthorize');
const { handleAPIResponse } = require('../../common/handleAPIResponse');

router.route('/api/restaurants/:restaurant_id/comments')
  .get(validateCustomer, async (req, res, next) => {
    const { restaurant_id } = req.params;
    if (!restaurant_id) return handleAPIResponse(res, 400, 'restaurant_id required');
    try {
      //
      const comments = await knex('comments')
        .select(
          'users.email',
          'users.name',
          'users.phone',
          'comments.content',
          'comments.user_id',
          'comments.create_time',
        )
        .join('users', 'users.user_id', 'comments.user_id')
        .where({ restaurant_id });
      return handleAPIResponse(res, 200, comments);
    } catch (e) {
      next(e);
    }
  })
  .post(validateCustomer, async (req, res, next) => {
    const { user_id } = req.session;
    const { restaurant_id } = req.params;
    const { content } = req.body;
    if (!restaurant_id || !content) return handleAPIResponse(res, 400, 'restaurant_id && content required');

    try {
      //
      await knex('comments')
        .insert({
          user_id,
          content,
          restaurant_id,
        });
      const comment = await knex('comments')
        .first(
          'comments.id as comment_id',
          'users.email',
          'users.name',
          'users.phone',
          'comments.content',
          'comments.user_id',
          'comments.create_time',
        )
        .join('users', 'users.user_id', 'comments.user_id')
        .where({
          user_id,
          content,
          restaurant_id,
        })
        .orderBy('create_time', 'desc');
      return handleAPIResponse(res, 200, comment);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
