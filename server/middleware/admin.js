const adminMeddleware = function (req, res, next) {
  if (req.user.role === "ADMIN") {
    return next();
  }
  else res.status(404).json({ success: false })
}

module.exports = adminMeddleware