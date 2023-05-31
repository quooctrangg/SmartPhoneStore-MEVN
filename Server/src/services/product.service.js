const productDB = require('../models/product.model')
const ApiRes = require('../utils/api-res')
const fs = require('fs-extra');
const path = require('path');

const createProduct = async data => {
    let { id, name, price, brand, description, image, color, ram, storage } = data
    let product = await productDB.findById(id)
    if (product) return new ApiRes(400, 'failed', `${id} đã được đăng ký!`, null)
    return new ApiRes(200, 'success', 'create success', await productDB.create({ _id: id, name, price, brand, description, image, color, ram, storage }))
}

const findOneProduct = async id => {
    let product = await productDB.findById(id)
    if (product) return new ApiRes(200, 'success', 'Tìm thấy sản phẩm!', product)
    return new ApiRes(400, 'failed', 'Không tìm thấy sản phẩm!', null)
}

const findAllProducts = async () => {
    let products = await productDB.find({})
    if (products) return new ApiRes(200, 'success', 'Tìm thấy tất cả sản phẩm!', products)
    return new ApiRes(400, 'failed', 'Không tìm thấy sản phẩm!', null)
}

const updateProduct = async (id, data) => {
    let { name, brand, price, description, image, colors, storage, ram } = data
    let product = await productDB.findByIdAndUpdate(id, { name, brand, price, description, image, colors, storage, ram }, { new: true })
    if (product) return new ApiRes(200, 'success', 'Cập nhật sản phẩm thàng công!', product)
    return new ApiRes(400, 'failed', 'Không tìm thấy sản phẩm!', null)
}

const deleteProduct = async id => {
    let product = await productDB.findByIdAndDelete(id)
    if (product) return new ApiRes(200, 'success', 'Xóa sản phẩm thành công!', null)
    return new ApiRes(400, 'failed', 'Không tìm thấy sản phẩm!', null)
}

const deleteAllProducts = async () => {
    let data = await productDB.deleteMany({})
    if (data.deletedCount > 0) return new ApiRes(200, 'success', `Xóa thành công ${data.deletedCount} sản phẩm!`, data.deletedCount)
    return new ApiRes(400, 'failed', 'Không tìm thấy sản phẩm!', null)
}

const removeImg = async filename => {
    const filePath = path.join(__dirname, '..', 'public/images', filename);
    await fs.unlink(filePath);
    return new ApiRes(200, 'success', `${filename} đã bị xóa!`, null)
}

const removeAllImgs = async () => {
    const directoryPath = path.join(__dirname, '..', 'public/images')
    const files = await fs.readdir(directoryPath);
    for (const file of files) {
        const filePath = path.join(directoryPath, file);
        await fs.unlink(filePath);
    }
    return new ApiRes(200, 'success', `${files.length} tập tin đã bị xóa`, null)
}

module.exports = {
    createProduct,
    findOneProduct,
    findAllProducts,
    updateProduct,
    deleteProduct,
    deleteAllProducts,
    removeImg,
    removeAllImgs
}