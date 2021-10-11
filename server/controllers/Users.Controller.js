const prisma = require('../helpers/prisma');
const Redis = require('../helpers/redis');
const {
  REDIS_USERS
} = require('../constants/redis');

const redis = new Redis(REDIS_USERS);

class Users {
  async getOne(req, res) {
    const id = parseInt(req.params.id);
    const user = await redis.hget(id);
    if (user) res.status(200).json({
      success: true,
      user
    });
    else {
      const user = await prisma.users.findUnique({
        where: {
          id,
        }
      });
      res.status(200).json({
        success: true,
        user
      });
    }


  }
}

module.exports = new Users()