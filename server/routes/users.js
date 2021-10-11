const router = require('express').Router();
const Users = require('../controllers/Users.Controller');

router.get('/:id', Users.getOne);

module.exports = router;