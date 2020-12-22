const knex = require('../knex');
const { verifyAccessToken } = require('../common/jwt');

module.exports = {
  socketAuthentication: async (socket, next) => {
    try {
      const { token } = socket.handshake.query;
      const credentials = verifyAccessToken(token);
      const { user_id } = credentials;
      const { first_name, last_name, email, avatar_url, group_id } = await knex('users').first().where({ user_id });
      Object.assign(socket, { credentials: { user_id, first_name, last_name, email, avatar_url, group_id } });
      next();
    } catch (e) {
      next(new Error('Unauthorized'));
    }
  },
};
