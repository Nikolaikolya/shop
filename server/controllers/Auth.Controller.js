const prisma = require('../helpers/prisma');
const bcrypt = require('bcrypt');
const generateTokens = require('../helpers/token');
const Redis = require('../helpers/redis');
const {
  REDIS_USERS
} = require('../constants/redis');

const redis = new Redis(REDIS_USERS);
class Auth {
  async register(req, res) {

    const {
      name,
      phone,
      email,
      password
    } = req.body;
    const password_hash = await bcrypt.hash(password, 7);

    const user = await prisma.users.findUnique({
      where: {
        email,
      }
    });

    if (!user) {
      const newUser = await prisma.users.create({
        data: {
          name,
          phone,
          email,
          password_hash,
        }
      })

      if (newUser) {
        await redis.hset(newUser.id, newUser);
        const tokens = await generateTokens(newUser.id, newUser.rore_id, "15m");
        tokens.refresh_token = "";

        res.status(200).json({
          success: true,
          user: newUser,
          tokens
        });
      } else res.status(404).json({
        success: false
      });
    } else res.status(400).json({
      success: false,
      message: "Такой пользователь уже есть!"
    });
  }

  async login(req, res) {
    const {
      email,
      password
    } = req.body

    const user = await prisma.users.findUnique({
      where: {
        email,
      }
    })

    if (!user) res.status(400).json({
      success: false,
      message: "Такой пользователь не найден!"
    });

    const hashResult = await bcrypt.compare(password, user.password_hash);

    if (!hashResult) res.status(400).json({
      success: false,
      message: "Неверный пароль."
    });

    const tokens = await generateTokens(user.id, user.role);

    res.status(200).json({
      success: true,
      tokens,
      user
    });
  }
}

module.exports = new Auth();