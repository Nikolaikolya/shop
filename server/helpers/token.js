var jwt = require('jsonwebtoken');
const Redis = require('./redis');

const { REDIS_REFRESH_TOKEN } = require('../constants/redis')

const redisRefreshToken = new Redis(REDIS_REFRESH_TOKEN)

const generateTokens = async (id, role, expire = "20000000s") => {
  const payload = {
    id,
    role
  };

  const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expire
  });

  const refresh_token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "30d"
  });

  await redisRefreshToken.hset(id, refresh_token);

  return { access_token, refresh_token };
}

module.exports = generateTokens