const router = require('express').Router();
const { validateCustomer } = require('../../middlewares/middlewarAuthorize');
const { handleAPIResponse } = require('../../common/handleAPIResponse');

router.route('/api/logout')
  .get(validateCustomer, (req, res, next) => {
    try {
      req.session.destroy(() => handleAPIResponse(res, 200));
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
