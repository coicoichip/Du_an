const jsonwebtoken = require('jsonwebtoken');
const secret = 'Sz5m21dpoOcDtxJqs3oGEgc1FxsUnvvUXLxlZ7mTiO4DMjUaitWe91D95xkr55N6AhyeiZwjgUvYjNcQhsOMzkOuKe0igq6mMtAxYSLwnOxn8r87RnWHjOVcSfZGg5of';
module.exports = {
  signAccessToken: credentials => jsonwebtoken.sign(credentials, secret, { algorithm: 'HS256', expiresIn: '7d' }),
  verifyAccessToken: token => jsonwebtoken.verify(token, secret),
};
