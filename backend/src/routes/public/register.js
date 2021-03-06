const router = require('express').Router();
const knex = require('../../knex');
const { handleAPIResponse } = require('../../common/handleAPIResponse');

router.route('/api/register')
  .post(async (req, res, next) => {
    const { email, password, position, name, phone, address, img_url } = req.body;
    if (!email || !password || !position) return handleAPIResponse(res, 400, 'email && password && position required');
    if (!['customer', 'owner'].includes(position)) return handleAPIResponse(res, 400, 'positon invalid');

    try {
      const check_email = await knex('users').first().where({ email });
      if (check_email) return handleAPIResponse(res, 400, 'email exist');
      await knex('users').insert({ email, password, name, phone, address, position, img_url });
      const user = await knex('users').first().where({ email });
      if (!user) return handleAPIResponse(res, 500, 'internal server error');
      Object.assign(req.session, user);

      return handleAPIResponse(res, 200);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
