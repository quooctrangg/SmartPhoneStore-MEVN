import { defineStore } from 'pinia'
import { ref } from 'vue'

import authService from '../services/auth.service'

export const useAuthStore = defineStore('auth', () => {
    const isLoading = ref(false)
    const err = ref(null)
    const result = ref(null)
    const user = ref(null)

    const validateMobile = (number) => {
        let vnf_regex = /((0)+([0-9]{9})\b)/g;
        return vnf_regex.test(number)
    }

    const login = async data => {
        isLoading.value = true
        err.value = null
        result.value = null
        try {
            let res = await authService.login(data)
            if (res.code !== 200) throw new Error(res.message)
            user.value = res.data
            result.value = res
        } catch (error) {
            err.value = error.message
        } finally {
            isLoading.value = false
        }
    }

    const logout = async () => {
        isLoading.value = true
        err.value = null
        result.value = null
        try {
            let res = await authService.logout()
            if (res.code !== 200) throw new Error(res.message)
            result.value = res
            user.value = null
        } catch (error) {
            err.value = error.message
        } finally {
            isLoading.value = false
        }
    }

    const register = async data => {
        isLoading.value = true
        err.value = null
        result.value = null
        try {
            let res = await authService.register(data)
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
            let res = await authService.updateUser(id, data)
            if (res.code !== 200) throw new Error(res.message)
            result.value = res
        } catch (error) {
            err.value = error.message
        } finally {
            isLoading.value = false
        }
    }

    return { user, err, isLoading, result, validateMobile, login, logout, register, updateUser }
}, {
    persist: {
        key: 'auth-store',
        storage: sessionStorage
    }
})