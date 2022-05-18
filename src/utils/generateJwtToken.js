const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRED } = require('./env');

module.exports = async (payload) => {
  const token = await jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRED,
  });

  return token;
};
