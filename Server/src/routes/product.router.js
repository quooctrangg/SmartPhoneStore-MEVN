const express = require('express');
const product = require('../controllers/product.controller')
const { upload } = require('../middlewares/uploadImgMiddlewares')
const { checkLogin, checkAdmin } = require('../middlewares/login.middlewares')

const router = express.Router();

router.route('/')
    .get(product.findAllProducts)
    .post(checkLogin, checkAdmin, product.createProduct)
    .delete(checkLogin, checkAdmin, product.deleteAllProducts)

router.route('/image')
    .post(checkLogin, checkAdmin, upload.single('image'), product.uploadImage)
    .delete(checkLogin, checkAdmin, product.removeImages)

router.route('/image/:filename')
    .delete(checkLogin, checkAdmin, product.removeImage)

router.route('/:id')
    .get(product.findOneProduct)
    .put(checkLogin, checkAdmin, product.updateProduct)
    .delete(checkLogin, checkAdmin, product.deleteProduct)

module.exports = router;