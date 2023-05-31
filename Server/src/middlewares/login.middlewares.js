const jwt = require('jsonwebtoken')
const userDB = require('../models/user.model')
const ApiRes = require('../utils/api-res')
const ApiError = require('../utils/api-error')
require('dotenv')

const checkLogin = async (req, res, next) => {
    try {
        let token = req.cookies['Token']
        if (!token) return res.json(new ApiRes(401, 'failed', 'Bạn chưa đăng nhập!', null))
        let user = jwt.verify(token, process.env.ACCESS_TOKEN)
        let data = await userDB.findOne({ _id: user.id })
        if (data) {
            req.role = data.role
            if (data.role === 0) req._id = data._id
            next()
        } else return res.json(new ApiRes(400, 'failed', 'Không tìm thấy người dùng!', null))
    } catch (error) {
        return res.json(new ApiRes(401, 'failed', 'Bạn chưa đăng nhập!', null))
    }
}

const checkAdmin = (req, res, next) => {
    try {
        if (req.role === 0) next()
        else return res.json(new ApiRes(400, 'failed', 'Bạn không phải là quản trị viên!', null))
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

module.exports = {
    checkLogin, checkAdmin
}