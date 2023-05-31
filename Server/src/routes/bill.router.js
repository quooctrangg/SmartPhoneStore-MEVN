const express = require('express');
const bill = require('../controllers/bill.controller');
const { checkLogin, checkAdmin } = require('../middlewares/login.middlewares');
const router = express.Router();

router.route('/')
    .post(checkLogin, bill.createBill)
    .get(checkLogin, checkAdmin, bill.findAllBills)
    .delete(checkLogin, checkAdmin, bill.deleteAllBills)

router.route('/:id')
    .get(checkLogin, bill.findById)
    .put(checkLogin, checkAdmin, bill.updateBill)
    .delete(checkLogin, checkAdmin, bill.deleteBill)

router.route('/user/:idUser')
    .get(checkLogin, bill.findByUserId)

router.route('/code/:codestatus')
    .get(checkLogin, checkAdmin, bill.findByCodeStatus)

module.exports = router
