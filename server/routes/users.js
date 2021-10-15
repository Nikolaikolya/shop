const router = require('express').Router();
const Users = require('../controllers/Users.Controller');

// Middleware
const authMeddleware = require('../middleware/auth');
const adminMeddleware = require('../middleware/admin');

router.get('/:id', [authMeddleware, adminMeddleware], Users.getOne);
router.put('/', [authMeddleware], Users.update);

module.exports = router;