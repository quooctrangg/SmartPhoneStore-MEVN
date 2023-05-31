import { defineStore } from 'pinia'
import { ref } from 'vue'

import userService from '../services/user.service'

export const useUserStore = defineStore('user', () => {
    const isLoading = ref(false)
    const err = ref(null)
    const result = ref(null)

    const findById = async id => {
        isLoading.value = true
        err.value = null
        result.value = null
        try {
            let res = await userService.findOneUser(id)
            if (res.code !== 200) throw new Error(res.message)
            result.value = res
        } catch (error) {
            err.value = error.message
        } finally {
            isLoading.value = false
        }
    }

    const updateUser = async (id, data) => {
        isLoading.value = true
        err.value = null
        result.value = null
        try {
            let res = await userService.updateUser(id, data)
            if (res.code !== 200) throw new Error(res.message)
            result.value = res
        } catch (error) {
            err.value = error.message
        } finally {
            isLoading.value = false
        }
    }

    const getAllUsers = async () => {
        isLoading.value = true
        err.value = null
        result.value = null
        try {
            let res = await userService.findAllUsers()
            if (res.code !== 200) throw new Error(res.message)
            result.value = res
        } catch (error) {
            err.value = error.message
        } finally {
            isLoading.value = false
        }
    }

    const createUser = async data => {
        isLoading.value = true
        err.value = null
        result.value = null
        try {
            let res = await userService.createUser(data)
            if (res.code !== 200) throw new Error(res.message)
            result.value = res
        } catch (error) {
            err.value = error.message
        } finally {
            isLoading.value = false
        }
    }

    const deleteUser = async id => {
        isLoading.value = true
        err.value = null
        result.value = null
        try {
            let res = await userService.deleteUser(id)
            if (res.code !== 200) throw new Error(res.message)
            result.value = res
        } catch (error) {
            err.value = error.message
        } finally {
            isLoading.value = false
        }
    }

    const deleteAllUser = async () => {
        isLoading.value = true
        err.value = null
        result.value = null
        try {
            let res = await userService.deleteAllUsers()
            if (res.code !== 200) throw new Error(res.message)
            result.value = res
        } catch (error) {
            err.value = error.message
        } finally {
            isLoading.value = false
        }
    }

    return { isLoading, err, result, deleteAllUser, getAllUsers, findById, updateUser, createUser, deleteUser }
})