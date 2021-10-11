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

  async update(req, res) {
    const { id } = req.user;
    const updateUserData = {};
    const { name, email, phone, city, adress, avatar, images } = req.body;

    name ? updateUserData.name = name : 'null';
    email ? updateUserData.email = email : null;
    phone ? updateUserData.phone = phone : null;
    city ? updateUserData.city = city : null;
    adress ? updateUserData.adress = adress : null;
    avatar ? updateUserData.avatar = avatar : null;
    images ? updateUserData.images = images : null;

    const user = await prisma.users.findUnique({ where: { id } });

    if (!user) res.status(400).json({ success: false, message: "Пользователь не найден!" });

    if (id !== user.id) res.status(400).json({ success: false, message: "Этого пользователя нельзя изменять!" });

    const newUser = await prisma.users.update({
      where: { id },
      data: updateUserData
    })

    if (!newUser) res.status(400).json({ success: false, message: "Произошла ошибка при обнвлении!" });

    await redis.hset(id, newUser);

    res.status(200).json({ success: true, user: newUser });
  }
}

module.exports = new Users()