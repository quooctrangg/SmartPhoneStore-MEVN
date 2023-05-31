<script setup>
import { ref, reactive } from "vue"
import { useRouter } from 'vue-router'
import { useProductStore } from '../../stores/product.store'
import { useToast } from 'vue-toast-notification';

const $toast = useToast();
const productStore = useProductStore()
const router = useRouter()

const product = reactive({})
const selectedFile = ref(null)
const url = ref(null)

const onFileSelected = (event) => {
    selectedFile.value = event.target.files[0]
    url.value = URL.createObjectURL(selectedFile.value)
}

const handleSubmitProduct = async () => {
    try {
        const image = new FormData()
        image.append('image', selectedFile.value)
        let res = await productStore.uploadImage(image)
        if (!res) {
            $toast.error(productStore.err, { position: 'top-right' })
            return
        }
        product.image = res.data
        await productStore.createProduct(product)
        if (productStore.err) {
            $toast.error(productStore.err, { position: 'top-right' })
            return
        }
        $toast.success(productStore.result.message, { position: 'top-right' })
        router.push({ name: 'product-manager' })
    } catch (error) {
        console.log(error);
    }
}
</script>
<template>
    <section class="bg-gray-5">
        <div class="mt-10 mx-auto flex justify-center">
            <div class=" bg-white rounded-lg shadow w-[700px]">
                <div class="p-7">
                    <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl text-center text-teal-500 pb-5">
                        Thêm Sản Phẩm
                    </h1>
                    <form class="flex flex-col items-center gap-5" @submit.prevent="handleSubmitProduct"
                        enctype="multipart/form-data">
                        <div class="flex gap-5 w-full">
                            <div class="w-2/4">
                                <div class="mt-2">
                                    <label for="id" class="block mb-1 text-sm font-medium text-gray-900">
                                        Mã sản phẩm
                                    </label>
                                    <input type="text" name="id" id="id" required v-model="product.id"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-teal-500">
                                </div>
                                <div class="mt-2">
                                    <label for="name" class="block mb-1 text-sm font-medium text-gray-900">
                                        Tên sản phẩm
                                    </label>
                                    <input type="text" name="name" id="name" v-model="product.name"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-teal-500">
                                </div>
                                <div class="mt-2">
                                    <label for="price" class="block mb-1 text-sm font-medium text-gray-900">
                                        Giá tiền (VNĐ)
                                    </label>
                                    <input type="number" name="price" id="price" v-model="product.price"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-teal-500">
                                </div>
                                <div class="mt-2">
                                    <label for="brand" class="block mb-1 text-sm font-medium text-gray-900">
                                        Thương hiệu
                                    </label>
                                    <input type="text" name="brand" id="brand" v-model="product.brand"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5  focus:outline-teal-500">
                                </div>
                                <div class="mt-2">
                                    <label for="description" class="block mb-1 text-sm font-medium text-gray-900">
                                        Mô tả
                                    </label>
                                    <textarea type="text" name="description" id="description" v-model="product.description"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5  focus:outline-teal-500"></textarea>
                                </div>
                                <div class="mt-2">
                                    <label for="color" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                        Màu
                                    </label>
                                    <input type="text" name="color" id="color" required v-model="product.color"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5  focus:outline-teal-500">
                                </div>
                                <div class="mt-2">
                                    <label for="ram" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                        Bộ nhớ (RAM)
                                    </label>
                                    <input type="number" name="ram" id="ram" required v-model="product.ram"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5  focus:outline-teal-500">
                                </div>
                                <div class="mt-2">
                                    <label for="storage"
                                        class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                        Dung lượng
                                    </label>
                                    <input type="number" name="storage" id="storage" required v-model="product.storage"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5  focus:outline-teal-500">
                                </div>
                            </div>
                            <div class="w-2/4 h-full">
                                <div class="flex flex-col items-center gap-5">
                                    <div class="mt-2">
                                        <label for="image" class="block mb-1 text-sm font-medium text-gray-900">
                                            Hình ảnh
                                        </label>
                                        <input type="file" name="image" id="image" accept="image/png, image/jpeg"
                                            @change="onFileSelected"
                                            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400">
                                    </div>
                                    <div class="w-[60%]">
                                        <img class="w-full object-cover" :src="url" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex gap-5 w-[50%]">
                            <router-link :to="{ name: 'product-manager' }"
                                class="w-full rounded-lg text-sm px-5 py-2.5 text-center bg-red-500 hover:bg-red-300 text-slate-900 hover:text-stone-100 font-semibold">
                                <i class="fa-solid fa-xmark"></i>
                                Hủy
                            </router-link>
                            <button type="submit"
                                class="w-full rounded-lg text-sm px-5 py-2.5 text-center bg-teal-500 hover:bg-teal-300 text-slate-900 hover:text-stone-100 font-semibold">
                                <i class="fa-solid fa-plus"></i>
                                Thêm
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>