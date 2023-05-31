<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import { useProductStore } from '../stores/product.store'
import { useToast } from 'vue-toast-notification'
import { useAuthStore } from '../stores/auth.store'

const route = useRoute()
const productStore = useProductStore()
const $toast = useToast()
const authStore = useAuthStore()

const product = ref(null)
const quantity = ref(1)

const getProduct = async id => {
    await productStore.getProduct(id)
    if (productStore.err) {
        $toast.error(product.err)
        return
    }
    product.value = productStore.result.data
}

const add = () => {
    if (quantity.value < 10) {
        quantity.value = quantity.value + 1
    } else {
        $toast.warning('Số lượng tối đa có thể đặt là 10', { position: 'top-right' })
    }
}

const remove = () => {
    if (quantity.value > 1) {
        quantity.value = quantity.value - 1
    } else {
        $toast.warning('Số lượng tối thiểu có thể đặt là 1', { position: 'top-right' })
    }
}

const btnAddCart = () => {
    if (authStore?.user) {
        const { _id, name, price } = product.value
        const sl = quantity.value
        productStore.addCart({ id: _id, name, price, quantity: sl })
    } else {
        $toast.warning('Vui lòng đăng nhập!', { position: 'top-right' })
    }
}

onMounted(() => {
    getProduct(route.params.id)
})

watch(quantity, (newE, oldE) => {
    if (newE > 10) {
        $toast.warning('Số lượng tối đa có thể đặt là 10', { position: 'top-right' })
        quantity.value = 10
    }
    if (newE < 1) {
        $toast.warning('Số lượng tối thiểu có thể đặt là 1', { position: 'top-right' })
        quantity.value = 1
    }
})
</script>
<template>
    <section>
        <h1 class="text-center text-teal-500 text-3xl font-bold mt-5">Chi Tiết Sản Phẩm</h1>
        <div class="flex justify-center gap-10 h-auto w-[1100px] mx-auto mt-5" v-if="product">
            <div class="w-full">
                <img class="w-full rounded-xl" :src="`http://localhost:3000/public/images/` + product.image" alt="">
            </div>
            <div>
                <h1 class="text-2xl text-red-600 font-semibold text-center">{{ product?.name }}</h1>
                <div class="">
                    <div class="text-xl text-teal-500 mt-2">
                        Thương hiệu: <span class="italic text-black">{{ product.brand }}</span>
                    </div>
                    <div class="text-xl text-teal-500 mt-2">
                        Màu sắc: <span class="italic text-black">{{ product.color }}</span>
                    </div>
                    <div class="text-xl text-teal-500 mt-2">
                        Bộ nhớ (RAM): <span class="italic text-black">{{ product.ram }}</span>
                    </div>
                    <div class="text-xl text-teal-500 mt-2">
                        Dung lượng: <span class="italic text-black">{{ product.storage }}</span>
                    </div>
                    <div class="text-xl text-teal-500 mt-2 text-justify">
                        Mô tả: <span class="text-black leading-10">{{ product.description }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-5">
            <div class="flex gap-20 mt-5 justify-center">
                <div class="text-green-600 font-semibold text-xl">
                    Giá:
                    <span class="text-red-600">
                        {{ Number(product?.price).toLocaleString('de-DE', { style: 'currency', currency: 'VND' }) }}
                    </span>
                </div>
                <div class="font-semibold text-green-600 text-xl">
                    Tình trạng:
                    <span class="text-red-600">
                        {{ product?.quantity > 0 ? 'Còn hàng' : 'Hết hàng' }}
                    </span>
                </div>
            </div>
            <div class="flex justify-center gap-10">
                <div class="flex">
                    <button @click="remove" class="border border-black w-[50px] hover:bg-slate-400">
                        <i class="fa-solid fa-minus"></i>
                    </button>
                    <input class="w-[75px] h-[50px] text-center text-black" type="number" v-model="quantity">
                    <button @click="add" class="border border-black w-[50px] hover:bg-slate-400">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
                <div>
                    <button type="button" @click="btnAddCart"
                        class="w-auto h-[50px] font-sans rounded-lg text-sm p-2 text-center bg-red-500 hover:bg-red-300 text-slate-900 hover:text-stone-100 font-semibold">
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>