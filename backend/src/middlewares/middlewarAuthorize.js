const { handleAPIResponse } = require('../common/handleAPIResponse');
module.exports = {
  validateCustomer: (req, res, next) => {
    const { position } = req.session;
    if (!position) return handleAPIResponse(res, 401, 'Unauthorized');
    if (!['customer', 'owner', 'admin'].includes(position)) return handleAPIResponse(res, 403, 'Forbidden');
    return next();
  },
  validateOwner: (req, res, next) => {
    const { position } = req.session;
    if (!position) return handleAPIResponse(res, 401, 'Unauthorized');
    if (!['owner', 'admin'].includes(position)) return handleAPIResponse(res, 403, 'Forbidden');
    return next();
  },
  validateAdmin: (req, res, next) => {
    const { position } = req.session;
    if (!position) return handleAPIResponse(res, 401, 'Unauthorized');
    if (!['admin'].includes(position)) return handleAPIResponse(res, 403, 'Forbidden');
    return next();
  },
};
