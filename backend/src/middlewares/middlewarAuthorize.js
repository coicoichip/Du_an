const { handleAPIResponse } = require('../common/handleAPIResponse');

module.exports = {
  validateSession: (req, res, next) => {
    if (!req.session.id) return handleAPIResponse(res, 401, 'Unauthorized');
    return next();
  },
  validateCustomer: (req, res, next) => {
    const { position } = req.session;
    if (!position || !['customer', 'owner', 'admin'].includes(position)) return handleAPIResponse(res, 401, 'Unauthorized');
    return next();
  },
  validateOwner: (req, res, next) => {
    const { position } = req.session;
    if (!position || !['owner', 'admin'].includes(position)) return handleAPIResponse(res, 401, 'Unauthorized');
    return next();
  },
  validateAdmin: (req, res, next) => {
    const { position } = req.session;
    if (!position || !['admin'].includes(position)) return handleAPIResponse(res, 401, 'Unauthorized');
    return next();
  },
};
