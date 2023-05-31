import { defineStore } from 'pinia'
import { ref } from 'vue'

import productService from '../services/product.service'

export const useProductStore = defineStore('product', () => {
    const isLoading = ref(false)
    const err = ref(null)
    const result = ref(null)
    const cart = ref([])

    const uploadImage = async image => {
        isLoading.value = true
        err.value = null
        try {
            let res = await productService.uploadImg(image)
            if (res.code !== 200) throw new Error(res.message)
            return res
        } catch (error) {
            err.value = error.message
        } finally {
            isLoading.value = false
        }
    }

    const createProduct = async data => {
        isLoading.value = true
        err.value = null
        result.value = null
        try {
            let res = await productService.createProduct(data)
            if (res.code !== 200) throw new Error(res.message)
            result.value = res
        } catch (error) {
            err.value = error.message
        } finally {
            isLoading.value = false
        }
    }

    const getAllProduct = async () => {
        isLoading.value = true
        err.value = null
        result.value = null
        try {
            let res = await productService.findAllProducts()
            if (res.code !== 200) throw new Error(res.message)
            result.value = res
        } catch (error) {
            err.value = error.message
        } finally {
            isLoading.value = false
        }
    }

    const getProduct = async id => {
        isLoading.value = true
        err.value = null
        result.value = null
        try {
            let res = await productService.findOneProduct(id)
            if (res.code !== 200) throw new Error(res.message)
            result.value = res
        } catch (error) {
            err.value = error.message
        } finally {
            isLoading.value = false
        }
    }

    const updateProduct = async (id, data) => {
        isLoading.value = true
        err.value = null
        result.value = null
        try {
            let res = await productService.updateProduct(id, data)
            if (res.code !== 200) throw new Error(res.message)
            result.value = res
        } catch (error) {
            err.value = error.message
        } finally {
            isLoading.value = false
        }
    }

    const removeImg = async filename => {
        isLoading.value = true
        err.value = null
        result.value = null
        try {
            let res = await productService.removeImg(filename)
            if (res.code !== 200) throw new Error(res.message)
            result.value = res
        } catch (error) {
            err.value = error.message
        } finally {
            isLoading.value = false
        }
    }

    const deleteProduct = async id => {
        isLoading.value = true
        err.value = null
        result.value = null
        try {
            let res = await productService.deleteProduct(id)
            if (res.code !== 200) throw new Error(res.message)
            result.value = res
        } catch (error) {
            err.value = error.message
        } finally {
            isLoading.value = false
        }
    }

    const addCart = (data) => {
        if (localStorage.getItem('cartItems')) {
            cart.value = JSON.parse(localStorage.getItem('cartItems'), [])
        }
        if (JSON.parse(localStorage.getItem('cartItems')) === null) {
            cart.value.push(data)
            localStorage.setItem('cartItems', JSON.stringify(cart.value))
        } else {
            let find;
            cart.value.findIndex((element, index) => { if (element.id == data.id) find = index })
            if (find !== undefined) cart.value[find].quantity = data.quantity
            else cart.value.push(data)
            localStorage.setItem('cartItems', JSON.stringify(cart.value))
        }
    }

    const removeAllImgs = async () => {
        isLoading.value = true
        err.value = null
        result.value = null
        try {
            let res = await productService.removeAllImgs()
            if (res.code !== 200) throw new Error(res.message)
            result.value = res
        } catch (error) {
            err.value = error.message
        } finally {
            isLoading.value = false
        }
    }

    return { result, isLoading, err, createProduct, uploadImage, getAllProduct, getProduct, removeImg, updateProduct, deleteProduct, addCart }
})