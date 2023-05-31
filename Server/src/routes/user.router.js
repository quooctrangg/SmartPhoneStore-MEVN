const express = require('express');
const user = require('../controllers/user.controller')
const { checkLogin, checkAdmin } = require('../middlewares/login.middlewares')
const router = express.Router();

router.route('/')
    .get(checkLogin, checkAdmin, user.findAllUsers)
    .post(checkLogin, checkAdmin, user.createUser)
    .delete(checkLogin, checkAdmin, user.deleteAllUsers)

router.route('/:id')
    .get(checkLogin, user.findOneUser)
    .put(checkLogin, checkAdmin, user.updateUser)
    .delete(checkLogin, checkAdmin, user.deleteUser)

module.exports = router