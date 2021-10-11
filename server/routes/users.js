const router = require('express').Router();
const Users = require('../controllers/Users.Controller');

// Middleware
const authMeddleware = require('../middleware/auth');

router.get('/:id', Users.getOne);
router.put('/', [authMeddleware], Users.update);

module.exports = router;