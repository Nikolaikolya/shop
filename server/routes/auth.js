const router = require('express').Router();
const Auth = require('../controllers/Auth.Controller');

router.post('/register', Auth.register)

module.exports = router;