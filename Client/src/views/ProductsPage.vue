<script setup>
import Card from '../components/common/Card.vue'
import Loading from '../components/common/Loading.vue'
import { useProductStore } from '../stores/product.store'
import { useToast } from 'vue-toast-notification'
import { onMounted, ref } from 'vue'

const productStore = useProductStore()
const $toast = useToast()

const products = ref(null)

const getAllProducts = async () => {
    await productStore.getAllProduct()
    if (productStore.err) {
        $toast.error(productStore.err)
        return
    }
    products.value = productStore.result.data
}

onMounted(() => {
    getAllProducts()
})
</script>
<template>
    <main class="w-[920px] flex items-center mr-auto ml-auto pt-3 pb-3 ">
        <div class="w-full flex gap-2 flex-wrap">
            <Loading v-if="productStore.err" :message="productStore.err" />
            <Card v-else v-for="product of  products" :key="product._id" :product="product" class="w-1/6" />
        </div>
    </main>
</template>

