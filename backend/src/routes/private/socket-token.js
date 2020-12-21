const router = require('express').Router();
const { handleAPIResponse } = require('../../common/handleAPIResponse');
const { validateCustomer } = require('../../middlewares/middlewarAuthorize');
const { signAccessToken } = require('../../common/jwt');

router.route('/api/socket_token')
  .get(validateCustomer, (req, res, next) => {
    const { user_id } = req.session;

    try {
      const jwt = {
        token: signAccessToken({ user_id }),
        expires_in: '7d',
      };

      return handleAPIResponse(res, 200, jwt);
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
