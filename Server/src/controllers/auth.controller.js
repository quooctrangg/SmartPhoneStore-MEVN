const authService = require('../services/auth.service')
const ApiError = require('../utils/api-error')
const ApiRes = require('../utils/api-res')

const registerUser = async (req, res, next) => {
    if (!req.body) return next(new ApiError(400, 'Thiếu tham số bắt buộc!'))
    try {
        let message = await authService.registerUser(req.body)
        return res.json(message)
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

const updateUser = async (req, res, next) => {
    if (!req.body && !req.params.id) return next(new ApiError(400, 'Thiếu tham số bắt buộc!'))
    try {
        let message = await authService.updateUser(req.params.id, req.body)
        return res.json(message)
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

const loginUser = async (req, res, next) => {
    if (!req.body) return next(new ApiError(400, 'Thiếu tham số bắt buộc!'))
    try {
        let message = await authService.loginUser(req.body)
        if (message.code !== 400) {
            res.cookie('Token', message.data.token, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'strict'
            })
        }
        return res.json(message)
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

const logoutUser = async (req, res, next) => {
    try {
        await res.clearCookie('Token')
        res.status(200).json(new ApiRes(200, 'success', 'Đăng xuất thành công!'))
    } catch (error) {
        return next(new ApiError(400, 'Thiếu tham số bắt buộc!'))
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    updateUser
}