const router = require('express').Router();
const Auth = require('../controllers/Auth.Controller');

router.post('/register', Auth.register);
router.post('/login', Auth.login);

module.exports = router;