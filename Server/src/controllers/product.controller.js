const productService = require('../services/product.service')
const ApiError = require('../utils/api-error')
const ApiRes = require('../utils/api-res')

const createProduct = async (req, res, next) => {
    if (!req.body) return next(new ApiError(400, 'Thiếu tham số bắt buộc!'))
    try {
        let message = await productService.createProduct(req.body)
        return res.json(message)
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

const uploadImage = async (req, res, next) => {
    if (!req.file) return next(new ApiError(400, 'Thiếu tham số bắt buộc!'))
    try {
        return await res.status(200).json(new ApiRes(200, 'success', 'Đã lưu tập tin!', req.file.filename));
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

const removeImage = async (req, res, next) => {
    if (!req.params.filename) return next(new ApiError(400, 'Thiếu tham số bắt buộc!'))
    try {
        let message = await productService.removeImg(req.params.filename)
        return res.json(message)
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

const removeImages = async (req, res, next) => {
    try {
        let message = await productService.removeAllImgs()
        return res.json(message)
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

const findOneProduct = async (req, res, next) => {
    if (!req.params) return next(new ApiError(400, 'Thiếu tham số bắt buộc!'))
    try {
        let message = await productService.findOneProduct(req.params.id)
        return res.json(message)
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

const findAllProducts = async (req, res, next) => {
    try {
        let message = await productService.findAllProducts()
        return res.json(message)
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

const updateProduct = async (req, res, next) => {
    if (!req.body && !req.params.id) return next(new ApiError(400, 'Thiếu tham số bắt buộc!'))
    try {
        let message = await productService.updateProduct(req.params.id, req.body)
        return res.json(message)
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

const deleteProduct = async (req, res, next) => {
    if (!req.params) return next(new ApiError(400, 'Thiếu tham số bắt buộc!'))
    try {
        let message = await productService.deleteProduct(req.params.id)
        return res.json(message)
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

const deleteAllProducts = async (req, res, next) => {
    try {
        let message = await productService.deleteAllProducts()
        return res.json(message)
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

module.exports = {
    createProduct,
    findOneProduct,
    findAllProducts,
    updateProduct,
    deleteProduct,
    deleteAllProducts,
    uploadImage,
    removeImage,
    removeImages
}