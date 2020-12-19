const router = require('express').Router();
const knex = require('../../knex');
const { validateSession } = require('../../middlewares/middlewarAuthorize');
const { handleAPIResponse } = require('../../common/handleAPIResponse');

router.route('/api/me')
  .get(validateSession, async (req, res, next) => {
    const { user_id, admin_id, position } = req.session;
    try {
      //
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
