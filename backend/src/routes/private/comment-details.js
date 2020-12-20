const router = require('express').Router();
const knex = require('../../knex');
const { validateCustomer } = require('../../middlewares/middlewarAuthorize');
const { handleAPIResponse } = require('../../common/handleAPIResponse');

router.route('/api/restaurants/:restaurant_id/comments/:comment_id')
  .get(validateCustomer, async (req, res, next) => {
    const { restaurant_id, comment_id } = req.params;
    if (!restaurant_id || !comment_id) return handleAPIResponse(res, 400, 'restaurant_id && comment_id required');

    try {
      const comment = await knex('comments')
        .first('users.email', 'users.name', 'users.phone', 'comments.content', 'comments.user_id', 'comments.create_time')
        .join('users', 'users.user_id', 'comments.user_id')
        .where({ restaurant_id, id: comment_id });
      if (!comment) return handleAPIResponse(res, 404, 'comment_id not exist');

      return handleAPIResponse(res, 200, comment);
    } catch (e) {
      next(e);
    }
  }).put(validateCustomer, async (req, res, next) => {
    const { user_id } = req.session;
    const { restaurant_id, comment_id } = req.params;
    const { content } = req.body;
    if (!restaurant_id || !comment_id || !content) return handleAPIResponse(res, 400, 'restaurant_id && comment_id && content required');

    try {
      let comment = await knex('comments').first().where({ user_id, restaurant_id, id: comment_id });
      if (!comment) return handleAPIResponse(res, 404, 'comment_id not exist');
      await knex('comments').update({ content }).where({ id: comment_id });
      comment = await knex('comments').first().where({ restaurant_id, id: comment_id });

      return handleAPIResponse(res, 200, comment);
    } catch (e) {
      next(e);
    }
  }).delete(validateCustomer, async (req, res, next) => {
    const { user_id } = req.session;
    const { restaurant_id, comment_id } = req.params;

    try {
      const comment = await knex('comments').first().where({ user_id, restaurant_id, id: comment_id });
      if (!comment) return handleAPIResponse(res, 404, 'comment_id not exist');
      await knex('comments').delete().where({ user_id, restaurant_id, id: comment_id });

      return handleAPIResponse(res, 200);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
