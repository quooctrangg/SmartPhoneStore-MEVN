<script setup>
import moment from 'moment'
import { onMounted, ref } from 'vue'
import { useProductStore } from '../../stores/product.store'
import { useToast } from 'vue-toast-notification'

const productStore = useProductStore()
const $toast = useToast()

const products = ref([])

const getAllProduct = async () => {
    products.value = []
    await productStore.getAllProduct()
    if (productStore.err) {
        $toast.error(productStore.err)
        return
    }
    products.value = productStore.result.data
}

const reLoad = () => {
    getAllProduct()
}

const deleteProduct = async (id, filename) => {
    let say = confirm('Bạn có chắc chắc muốn xóa sản phầm này?')
    if (say) {
        await productStore.deleteProduct(id)
        if (productStore.err) {
            $toast.error(productStore.err)
            return
        }
        await productStore.removeImg(filename)
        $toast.success(productStore.result.message)
        reLoad()
    }
}

const deleteAllProduct = () => {
    $toast.warning('Tính năng đang phát triển!')
}

onMounted(() => {
    getAllProduct()
})
</script>
<template>
    <div>
        <div class="flex items-end w-[90%] justify-between mx-auto">
            <div class="text-xl">
                <h1>Tổng số sản phẩm: {{ products.length }}</h1>
            </div>
            <div class="flex gap-5 items-center mt-5">
                <button @click="reLoad"
                    class="rounded-lg text-sm px-5 py-2.5 text-center bg-yellow-300 hover:bg-yellow-200 font-semibold">
                    <i class="fa-solid fa-rotate-right"></i>
                    Tải lại
                </button>
                <router-link :to="{ name: 'add-product' }"
                    class="rounded-lg text-sm px-5 py-2.5 text-center bg-green-400 hover:bg-green-300 text-slate-900 font-semibold">
                    <i class="fa-solid fa-plus"></i>
                    Thêm
                </router-link>
                <button @click="deleteAllProduct"
                    class="rounded-lg text-sm px-5 py-2.5 text-center bg-red-600 hover:bg-red-500 text-slate-900 font-semibold">
                    <i class="fa-solid fa-trash-can"></i>
                    Xóa tất cả
                </button>
            </div>
        </div>
        <div class="w-[90%] flex flex-col mx-auto mt-5">
            <table class="table-auto border-au border border-slate-400">
                <thead>
                    <tr>
                        <th class="border border-slate-900 p-2">STT</th>
                        <th class="border border-slate-900 p-2">Mã</th>
                        <th class="border border-slate-900 p-2">Hình ảnh</th>
                        <th class="border border-slate-900 p-2">Tên</th>
                        <th class="border border-slate-900 p-2">Giá</th>
                        <th class="border border-slate-900 p-2">Thương hiệu</th>
                        <th class="border border-slate-900 p-2">Miêu tả</th>
                        <th class="border border-slate-900 p-2">Màu</th>
                        <th class="border border-slate-900 p-2">Bộ nhớ (RAM)</th>
                        <th class="border border-slate-900 p-2">Dung lượng</th>
                        <th class="border border-slate-900 p-2">Số lượng</th>
                        <th class="border border-slate-900 p-2">Ngày đăng</th>
                        <th class="border border-slate-900 p-2">Ngày sửa</th>
                        <th class="border border-slate-900 p-2">Sửa</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(product, index) of products" :key="product._id">
                        <td class="border border-slate-900 p-1 text-center">{{ index + 1 }}</td>
                        <td class="border border-slate-900 p-1 text-center underline text-green-500">
                            <router-link :to="{ name: 'product-page', params: { id: product._id } }">
                                {{ product._id }}
                            </router-link>
                        </td>
                        <td class="border border-slate-900 max-w-[100px] p-1">
                            <img :src="`http://localhost:3000/public/images/` + product.image" alt="">
                        </td>
                        <td class="border border-slate-900 p-1 text-center hover:underline hover:text-green-500">
                            <router-link :to="{ name: 'product-page', params: { id: product._id } }">
                                {{ product.name }}
                            </router-link>
                        </td>
                        <td class="border border-slate-900 p-1">
                            {{ Number(product.price).toLocaleString('de-DE', { style: 'currency', currency: 'VND' }) }}
                        </td>
                        <td class="border border-slate-900 p-1 text-center">{{ product.brand }}</td>
                        <td class="border border-slate-900 p-1 max-w-[300px] text-justify">
                            {{ product.description }}
                        </td>
                        <td class="border border-slate-900 p-1 text-center">{{ product.color }}</td>
                        <td class="border border-slate-900 p-1 text-center w-[50px]">{{ product.ram }}</td>
                        <td class="border border-slate-900 p-1 text-center w-[50px]">{{ product.storage }}</td>
                        <td class="border border-slate-900 p-1 text-center w-[50px]">{{ product.quantity }}</td>
                        <td class="border border-slate-900 p-1 w-[100px]">{{ moment(product.createdAt).format('lll') }}</td>
                        <td class="border border-slate-900 p-1 w-[100px]">{{ moment(product.updatedAt).format('lll') }}</td>
                        <td class="border border-slate-900 p-1 text-center ">
                            <div class="flex flex-col gap-5">
                                <router-link :to="{ name: 'edit-product', params: { id: product._id } }"
                                    class="rounded-lg text-sm px-5 py-2.5 text-center bg-cyan-600 hover:bg-teal-300 text-slate-900 hover:text-stone-100 font-semibold">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                    Sửa
                                </router-link>
                                <button @click="deleteProduct(product._id, product.image)"
                                    class="rounded-lg text-sm px-5 py-2.5 text-center bg-red-600 hover:bg-red-300 text-slate-900 hover:text-stone-100 font-semibold">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                    Xóa
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>