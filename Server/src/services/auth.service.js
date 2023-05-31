const userDB = require('../models/user.model')
const ApiRes = require('../utils/api-res')
const bcrypt = require('bcrypt')
const { accessToken, refreshToken } = require('../utils/init_token')

const registerUser = async data => {
    let { firstname, lastname, numberphone, password, address, linkimg } = data
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    let user = await userDB.findOne({ numberphone: numberphone })
    if (user) return new ApiRes(400, 'failed', 'Số điện thoại đã tồn tại!', null)
    await userDB.create({ firstname, lastname, numberphone, password: hashPassword, address, linkimg })
    return new ApiRes(200, 'success', 'Đăng ký thành công!', null)
}

const updateUser = async (id, data) => {
    let { firstname, lastname, address, linkimg } = data
    let user = await userDB.findByIdAndUpdate(id, { firstname, lastname, address, linkimg }, { new: true })
    if (user) return new ApiRes(200, 'success', 'Cập nhật thành công', user)
    return new ApiRes(400, 'failed', 'Không tìm thấy người dùng!', null)
}

const loginUser = async data => {
    let { numberphone, password } = data
    const user = await userDB.findOne({ numberphone: numberphone })
    if (!user) return new ApiRes(400, 'failed', 'Số điện không tồn tại!', null)
    else {
        const valiPass = await bcrypt.compare(password, user.password)
        if (!valiPass) return new ApiRes(400, 'failed', 'Sai mật khẩu!', null)
        else {
            let token = accessToken(user)
            let { password, ...others } = user._doc
            let data = { token, ...others }
            return new ApiRes(200, 'success', 'Đăng nhập thành công!', data)
        }
    }
}

module.exports = {
    loginUser, registerUser, updateUser
}