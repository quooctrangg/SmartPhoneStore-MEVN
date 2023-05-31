<script setup>
import { onMounted, ref, watch } from 'vue'
import { useToast } from 'vue-toast-notification'
import { useAuthStore } from '../stores/auth.store'
import { useBillStore } from '../stores/bill.store'

const authStore = useAuthStore()
const $toast = useToast()
const billStore = useBillStore()

const products = ref([])
const sumQuantity = ref(0)
const sumPrice = ref(0)

const getAllCarts = () => {
    if (localStorage.getItem('cartItems')) {
        products.value = JSON.parse(localStorage.getItem('cartItems'), [])
        setSumQuantity()
    }
}

const add = index => {
    if (products.value[index].quantity < 10) {
        products.value[index].quantity = products.value[index].quantity + 1
        updateQuantity()
        setSumQuantity()
    } else {
        $toast.warning('Số lượng tối đa có thể đặt là 10', { position: 'top-right' })
    }
}

const remove = index => {
    if (products.value[index].quantity > 1) {
        products.value[index].quantity = products.value[index].quantity - 1
        updateQuantity()
        setSumQuantity()
    } else {
        $toast.warning('Số lượng tối thiểu có thể đặt là 1', { position: 'top-right' })
    }
}

const deleteCartItem = (index) => {
    products.value.splice(index, 1)
    updateQuantity()
    setSumQuantity()
}

const updateQuantity = () => {
    localStorage.setItem('cartItems', JSON.stringify(products.value))
}

const setSumQuantity = () => {
    sumQuantity.value = 0
    products.value.forEach(element => {
        sumQuantity.value += element.quantity
    })
}
const setSumPrice = () => {
    sumPrice.value = 0
    products.value.forEach(element => {
        sumPrice.value += element.quantity * element.price
    })
}

const createBill = async () => {
    if (products.value.length) {
        if (confirm('Bạn chắc chắn muốn đặt?')) {
            let data = {
                idUser: authStore.user._id,
                products: products.value,
                codestatus: 0,
                sumquantity: sumQuantity.value,
                sumprice: sumPrice.value
            }
            await billStore.createBill(data)
            if (billStore.err) {
                $toast.error(billStore.err, { position: 'top-right' })
                return
            }
            $toast.success(billStore.result.message, { position: 'top-right' })
            products.value = []
            sumPrice.value = 0
            sumQuantity.value = 0
            updateQuantity()
        }
    } else {
        $toast.warning('Giỏ hàng trống!', { position: 'top-right' })
    }
}

onMounted(() => {
    getAllCarts()
})

watch(sumQuantity, (newQuantity) => {
    setSumPrice()
})
</script>
<template>
    <section>
        <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl text-center text-teal-500 pb-5">Giỏ hàng</h1>
        <div class="w-full flex flex-col items-center justify-center">
            <table class="table-auto border-au border border-slate-400 w-[70%] text-black">
                <thead>
                    <tr class="bg-teal-300">
                        <th class="border border-slate-900 p-2 text-xl">Mã</th>
                        <th class="border border-slate-900 p-2 text-xl">Tên sản phẩm</th>
                        <th class="border border-slate-900 p-2 text-xl">Đơn giá</th>
                        <th class="border border-slate-900 p-2 text-xl">Số lượng</th>
                        <th class="border border-slate-900 p-2 text-xl">Thành tiền</th>
                        <th class="border border-slate-900 p-2 text-xl">Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="products?.length" v-for="(product, index) of products" :key="product._id">
                        <td
                            class="border border-slate-900 p-1 text-center text-xl text-teal-500 hover:text-teal-300 underline">
                            <router-link :to="{ name: 'product-page', params: { id: product.id } }">
                                {{ product.id }}
                            </router-link>
                        </td>
                        <td class="border border-slate-900 p-1 text-xl">{{ product.name }}</td>
                        <td class="border border-slate-900 p-1 text-center text-xl">
                            {{ Number(product.price).toLocaleString('de-DE', { style: 'currency', currency: 'VND' }) }}
                        </td>
                        <td class="border border-slate-900 p-1 w-[200px]">
                            <div class="flex mx-auto">
                                <button @click="remove(index)" class="border border-black w-[50px] hover:bg-slate-400">
                                    <i class="fa-solid fa-minus"></i>
                                </button>
                                <input class="w-[75px] h-[40px] text-center text-black" type="number"
                                    v-model="product.quantity">
                                <button @click="add(index)" class="border border-black w-[50px] hover:bg-slate-400">
                                    <i class="fa-solid fa-plus"></i>
                                </button>
                            </div>
                        </td>
                        <td class="border border-slate-900 p-1 text-center text-xl">
                            {{ Number(product.price * product.quantity).toLocaleString('de-DE', {
                                style: 'currency',
                                currency: 'VND'
                            }) }}
                        </td>
                        <td class="border border-slate-900 p-1 text-center w-[50px]">
                            <button class="text-red-600 text-3xl" @click="deleteCartItem(index)">
                                <i class="fa-solid fa-xmark"></i>
                            </button>
                        </td>
                    </tr>
                    <tr v-else>
                        <td class="border border-slate-900 p-1 text-xl text-center" colspan="6">Giỏ hàng trống...</td>
                    </tr>
                    <tr>
                        <td class="border border-slate-900 p-1 text-xl text-center" colspan="3">
                            <p class="text-xl text-end font-semibold">Tổng cộng:</p>
                        </td>
                        <td class="border border-slate-900 p-1 text-xl text-center text-red-600 font-semibold">
                            {{ sumQuantity }}
                        </td>
                        <td class="border border-slate-900 p-1 text-xl text-center text-red-600 font-semibold">
                            {{ Number(sumPrice).toLocaleString('de-DE', { style: 'currency', currency: 'VND' }) }}
                        </td>
                        <td class="border border-slate-900 p-1 text-xl text-center text-red-600"></td>
                    </tr>
                </tbody>
            </table>
            <div class="flex justify-end w-[70%] gap-10 mt-5 items-center">
                <router-link class="text-xl underline text-teal-400 hover:text-red-200" :to="{ name: 'home-page' }">
                    Xem thêm sản phẩm khác
                </router-link>
                <button @click="createBill"
                    class="w-auto font-sans rounded-lg text-xl p-2 text-center bg-red-500 hover:bg-red-300 text-slate-900 hover:text-stone-100 font-semibold">
                    Đặt mua
                </button>
            </div>
        </div>
    </section>
</template>