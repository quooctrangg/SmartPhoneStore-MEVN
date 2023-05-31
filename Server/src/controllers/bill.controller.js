const billService = require('../services/bill.service')
const ApiError = require('../utils/api-error')

const createBill = async (req, res, next) => {
    if (!req.body) return next(new ApiError(400, 'Thiếu tham số bắt buộc!'))
    try {
        let message = await billService.createBill(req.body)
        return res.json(message)
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

const findByUserId = async (req, res, next) => {
    if (!req.params.idUser) return next(new ApiError(400, 'Thiếu tham số bắt buộc!'))
    try {
        let message = await billService.findByUserId(req.params.idUser)
        return res.json(message)
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

const findById = async (req, res, next) => {
    if (!req.params.id) return next(new ApiError(400, 'Thiếu tham số bắt buộc!'))
    try {
        let message = await billService.findById(req.params.id)
        return res.json(message)
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

const findAllBills = async (req, res, next) => {
    try {
        let message = await billService.findAllBills()
        return res.json(message)
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

const findByCodeStatus = async (req, res, next) => {
    if (!req.params.codestatus) return next(new ApiError(400, 'Thiếu tham số bắt buộc!'))
    try {
        let message = await billService.findByCodeStatus(req.params.codestatus)
        return res.json(message)
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

const updateBill = async (req, res, next) => {
    if (!req.body && !req.params.id) return next(new ApiError(400, 'Thiếu tham số bắt buộc!'))
    try {
        const { codestatus, idAdmin } = req.body
        let data = { codestatus, idAdmin }
        //Object.keys(data).forEach((key) => data[key] === undefined && delete data[key]);
        let message = await billService.updateBill(req.params.id, data)
        return res.json(message)
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

const deleteBill = async (req, res, next) => {
    if (!req.params.id) return next(new ApiError(400, 'Thiếu tham số bắt buộc!'))
    try {
        let message = await billService.deleteBill(req.params.id)
        return res.json(message)
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

const deleteAllBills = async (req, res, next) => {
    try {
        let message = await billService.deleteAllBills()
        return res.json(message)
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

module.exports = {
    createBill,
    findByUserId,
    findById,
    findByCodeStatus,
    updateBill,
    deleteAllBills,
    deleteBill,
    findAllBills
}