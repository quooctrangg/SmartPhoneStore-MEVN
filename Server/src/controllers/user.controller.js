const userService = require('../services/user.service')
const ApiError = require('../utils/api-error')

const createUser = async (req, res, next) => {
    if (!req.body) return next(new ApiError(400, 'Thiếu tham số bắt buộc!'))
    try {
        let message = await userService.createUser(req.body)
        return res.json(message)
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

const findOneUser = async (req, res, next) => {
    if (!req.params.id) return next(new ApiError(400, 'Thiếu tham số bắt buộc!'))
    try {
        let message = await userService.findById(req.params.id)
        return res.json(message)
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

const findAllUsers = async (req, res, next) => {
    try {
        let message = await userService.findAll(req._id)
        return res.json(message)
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

const updateUser = async (req, res, next) => {
    if (!req.body && !req.params.id) return next(new ApiError(400, 'Thiếu tham số bắt buộc!'))
    try {
        let message = await userService.updateUser(req.params.id, req.body)
        return res.json(message)
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

const deleteUser = async (req, res, next) => {
    if (!req.params.id) return next(new ApiError(400, 'Thiếu tham số bắt buộc!'))
    try {
        let message = await userService.deleteUser(req.params.id)
        return res.json(message)
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

const deleteAllUsers = async (req, res, next) => {
    try {
        let message = await userService.deleteAllUsers(req._id)
        return res.json(message)
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

module.exports = {
    createUser,
    findOneUser,
    findAllUsers,
    updateUser,
    deleteUser,
    deleteAllUsers
}