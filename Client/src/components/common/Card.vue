<script setup>
import { useRouter } from 'vue-router'
import { useProductStore } from '../../stores/product.store'
import { useAuthStore } from '../../stores/auth.store'
import { useToast } from 'vue-toast-notification'

const router = useRouter()
const productStore = useProductStore()
const authStore = useAuthStore()
const $toast = useToast()

const props = defineProps(['product'])

const btnAddCart = () => {
    if (authStore?.user) {
        const { _id, name, price } = props.product
        productStore.addCart({ id: _id, name, price, quantity: 1 })
    } else {
        $toast.warning('Vui lòng đăng nhập!', { position: 'top-right' })
    }
}

const getProduct = (id) => {
    router.push({ name: 'product-page', params: { id } })
}
</script>
<template>
    <div class="w-[220px] rounded-sm overflow-hidden shadow-2xl border bg-white p-2 h-[500px] flex flex-col">
        <div class="w-full overflow-hidden h-1/2">
            <img class="w-full h-full  hover:scale-110 transition p-2 object-cover"
                :src="`http://localhost:3000/public/images/` + props.product.image" alt="iPhone 13 Pro Max">
        </div>
        <div class="h-1/2 flex flex-col">
            <div class="font-bold text-xl text-center flex-1 text-red-600 no-underline hover:underline cursor-pointer"
                @click="getProduct(props.product._id)">
                {{ props.product.name }}
            </div>
            <div>
                <span class="inline-block text-sm font-semibold text-gray-700 mr-1 mt-1">
                    Thương hiệu: {{ props.product.brand }}
                </span>
                <br>
                <span class="inline-block text-sm font-semibold text-gray-700 mr-1 mt-1">
                    Màu: {{ props.product.color }}
                </span>
                <br>
                <span class="inline-block text-sm font-semibold text-gray-700 mr-1 mt-1">
                    RAM: {{ props.product.ram }}GB
                </span>
                <br>
                <span class="inline-block text-sm font-semibold text-gray-700 mr-1 mt-1">
                    Dung lượng: {{ props.product.storage }}GB
                </span>
                <br>
                <p class="text-red-700 font-bold text-lg mt-1 text-right">
                    {{ Number(product.price).toLocaleString('de-DE', { style: 'currency', currency: 'VND' }) }}
                </p>
            </div>
            <div class="w-full flex justify-center">
                <button @click="btnAddCart"
                    class="w-auto font-sans rounded-lg text-sm p-2 text-center bg-teal-500 hover:bg-teal-300 text-slate-900 hover:text-stone-100 font-semibold"
                    type="button">Thêm Vào Giỏ Hàng</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
.border {
    border: 1px solid slategrey;
    border-radius: 25px;
}
</style>