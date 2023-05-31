const billDB = require('../models/bill.model')
const ApiRes = require('../utils/api-res')

const createBill = async data => {
    let { idUser, products, codestatus, sumquantity, sumprice } = data
    if (!products.length) return new ApiRes(400, 'failed', 'Không có sản phầm nào!', null)
    let bill = await billDB.create({ idUser, products: products, codestatus, sumquantity, sumprice })
    return new ApiRes(200, 'success', 'Tạo hóa đơn thành công!', bill)
}

const findByUserId = async idUser => {
    let bills = await billDB.find({ idUser })
    if (!bills) return new ApiRes(400, 'failed', 'Không tìm thấy hóa đơn!', null)
    return new ApiRes(200, 'success', 'Tìm thấy hóa đơn!', bills)
}

const findById = async id => {
    let bill = await billDB.findById(id)
    if (!bill) return new ApiRes(400, 'failed', 'Không tìm thấy hóa đơn!', null)
    return new ApiRes(200, 'success', 'Tìm thấy hóa đơn!', bill)
}

const findAllBills = async () => {
    let bills = await billDB.find({})
    if (!bills) return new ApiRes(400, 'failed', 'Không tìm thấy hóa đơn!', null)
    return new ApiRes(200, 'success', 'Tìm thấy hóa đơn!', bills)
}

const findByCodeStatus = async codestatus => {
    let bills = await billDB.find({ codestatus })
    if (!bills) return new ApiRes(400, 'failed', 'Không tìm thấy hóa đơn!', null)
    return new ApiRes(200, 'success', 'Tìm thấy hóa đơn!', bills)
}

const updateBill = async (id, data) => {
    let approval = new Date()
    let bill = await billDB.findByIdAndUpdate(id, { ...data, approval }, { new: true })
    if (!bill) return new ApiRes(400, 'failed', 'Không tìm thấy hóa đơn!', null)
    return new ApiRes(200, 'success', 'Cập nhật thành công!', bill)
}

const deleteBill = async id => {
    let bill = await billDB.findByIdAndDelete(id)
    if (!bill) return new ApiRes(400, 'failed', 'Không tìm thấy hóa đơn!', null)
    return new ApiRes(200, 'success', 'Xóa hóa đơn thành công!', null)
}

const deleteAllBills = async () => {
    let data = await billDB.deleteMany()
    if (data.deletedCount > 0) return new ApiRes(200, 'success', `Xóa thành công ${data.deletedCount} hóa đơn!`, data.deletedCount)
    return new ApiRes(400, 'failed', 'Không có hóa đơn nào!', null)
}

module.exports = {
    createBill,
    findByUserId,
    findById,
    findAllBills,
    findByCodeStatus,
    updateBill,
    deleteBill,
    deleteAllBills
}