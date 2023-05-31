import { defineStore } from 'pinia'
import { ref } from 'vue'

import billService from '../services/bill.service'

export const useBillStore = defineStore('bill', () => {
    const isLoading = ref(false)
    const err = ref(null)
    const result = ref(null)

    const findAllBills = async () => {
        isLoading.value = true
        err.value = null
        try {
            let res = await billService.findAllBills()
            if (res.code !== 200) throw new Error(res.message)
            result.value = res
        } catch (error) {
            err.value = error.message
        } finally {
            isLoading.value = false
        }
    }

    const findById = async id => {
        isLoading.value = true
        err.value = null
        try {
            let res = await billService.findById(id)
            if (res.code !== 200) throw new Error(res.message)
            result.value = res
        } catch (error) {
            err.value = error.message
        } finally {
            isLoading.value = false
        }
    }

    const updateBill = async (id, data) => {
        isLoading.value = true
        err.value = null
        try {
            let res = await billService.updateBill(id, data)
            if (res.code !== 200) throw new Error(res.message)
            result.value = res
        } catch (error) {
            err.value = error.message
        } finally {
            isLoading.value = false
        }
    }

    const findByCode = async codestatus => {
        isLoading.value = true
        err.value = null
        try {
            let res = await billService.findByCodeStatus(codestatus)
            if (res.code !== 200) throw new Error(res.message)
            result.value = res
        } catch (error) {
            err.value = error.message
        } finally {
            isLoading.value = false
        }
    }

    const createBill = async (data) => {
        isLoading.value = true
        err.value = null
        try {
            let res = await billService.createBill(data)
            if (res.code !== 200) throw new Error(res.message)
            result.value = res
        } catch (error) {
            err.value = error.message
        } finally {
            isLoading.value = false
        }
    }

    const findByIdUser = async idUser => {
        isLoading.value = true
        err.value = null
        try {
            let res = await billService.findByUserId(idUser)
            if (res.code !== 200) throw new Error(res.message)
            result.value = res
        } catch (error) {
            err.value = error.message
        } finally {
            isLoading.value = false
        }
    }

    return { isLoading, err, result, findAllBills, findById, updateBill, findByCode, createBill, findByIdUser }
})