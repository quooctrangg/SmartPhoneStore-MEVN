const express = require('express');
const auth = require('../controllers/auth.controller')
const { checkLogin } = require('../middlewares/login.middlewares')
const router = express.Router();

router.route('/register')
    .post(auth.registerUser)

router.route('/login')
    .post(auth.loginUser)

router.route('/logout')
    .post(auth.logoutUser)

router.route('/update/:id')
    .put(checkLogin, auth.updateUser)

module.exports = router
