const adminMeddleware = function (req, res, next) {
  console.log(req.user, 2);
  if (req.user.role_id === 3) {
    return next();
  }
  else res.status(404).json({ success: false, message: "У Вас нет прав доступа!" })
}

module.exports = adminMeddleware