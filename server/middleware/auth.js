const jwt = require('jsonwebtoken');

const authMeddleware = async function (req, res, next) {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      
      const decoded = verifyToken(token);

      req.user = decoded;

      next();
    } else res.status(401).json({ success: false, message: "Ошибка в маршруте!" });
  } catch (error) {

    if(error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ success: false });
    } else res.status(403).json({ success: false });

  }
}

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = authMeddleware