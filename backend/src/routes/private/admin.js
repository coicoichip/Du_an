const router = require('express').Router();
const knex = require('../../knex');
const { validateAdmin } = require('../../middlewares/middlewarAuthorize');
const { handleAPIResponse } = require('../../common/handleAPIResponse');

router.route('/api/upgrade_user')
  .post(validateAdmin, async (req, res, next) => {
    const { email } = req.body;

    try {
      const user = await knex('users').first().where({ email });
      if (!user) return handleAPIResponse(res, 404, 'user not found');
      await knex('users').update({ position: 'owner' }).where({ email });
      return handleAPIResponse(res, 200);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
