const userDB = require('../models/user.model')
const ApiRes = require('../utils/api-res')
const bcrypt = require('bcrypt')

const createUser = async data => {
    let { firstname, lastname, numberphone, password, address, role, linkimg } = data
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    let user = await userDB.findOne({ numberphone })
    if (user) return new ApiRes(400, 'failed', `${numberphone} đã được đăng ký!`, null)
    else {
        await userDB.create({ firstname, lastname, numberphone, password: hashPassword, address, role, linkimg })
        return new ApiRes(200, 'success', 'Tạo tài khoản thành công!', null)
    }
}

const findById = async id => {
    let data = await userDB.findById(id).select("-password")
    if (data) return new ApiRes(200, 'success', 'Tìm thấy người dùng!', data)
    return new ApiRes(400, 'failed', 'Không tìm thấy người dùng!', null)
}

const findAll = async idAdmin => {
    let data = await userDB.find({ _id: { $nin: idAdmin } }).select("-password")
    if (data) return new ApiRes(200, 'success', 'Tìm thấy tất cả tài khoản!', data)
    return new ApiRes(400, 'failed', 'Không tìm thấy tài khoản!', null)
}

const updateUser = async (id, data) => {
    let { firstname, lastname, address, role, linkimg } = data
    let user = await userDB.findByIdAndUpdate(id, { firstname, lastname, address, linkimg, role }, { new: true })
    if (user) return new ApiRes(200, 'success', 'Cập nhật tài khoản thành công!', user)
    return new ApiRes(400, 'failed', 'Không tìm thấy tài khoản!', null)
}

const deleteUser = async id => {
    let user = await userDB.findByIdAndDelete(id)
    if (user) return new ApiRes(200, 'success', 'Xóa tài khoản thành công!', null)
    return new ApiRes(400, 'failed', 'Không tìm thấy tài khoản!', null)
}

const deleteAllUsers = async idAdmin => {
    let data = await userDB.deleteMany({ _id: { $nin: idAdmin } })
    if (data.deletedCount > 0) return new ApiRes(200, 'success', `Xóa thành công ${data.deletedCount} tài khoản!`, data.deletedCount)
    return new ApiRes(400, 'failed', 'Không có tài khoản nào!', null)
}

module.exports = {
    createUser,
    findById,
    findAll,
    updateUser,
    deleteUser,
    deleteAllUsers
}