const adminMeddleware = function (req, res, next) {
  if (req.user.role === 0) {
    return next();
  }
  else res.status(404).json({ success: false });
}

module.exports = adminMeddleware