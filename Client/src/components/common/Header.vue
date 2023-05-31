<script setup>
import { useAuthStore } from '../../stores/auth.store'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'

const $toast = useToast()
const router = useRouter()
const authStore = useAuthStore()

const btnLogOut = async () => {
    await authStore.logout()
    if (authStore.err) {
        $toast.error(authStore.err, { position: 'top-right' })
        return
    }
    $toast.success(authStore.result.message, { position: 'top-right' })
    setTimeout(() => { router.push({ name: 'home-page' }) }, 400)
}
</script>
<template>
    <header class="w-[70%] mx-auto my-2">
        <nav class="w-full mx-auto flex items-center justify-around">
            <div class="">
                <router-link :to="{ name: 'home-page' }">
                    <img class="h-8 w-auto" src="/logo.png" alt="">
                </router-link>
            </div>
            <div class="flex justify-between gap-10">
                <router-link class="text-sm font-semibold leading-6 text-gray-900 hover:text-teal-500"
                    :to="{ name: 'home-page' }">
                    <i class="fa-solid fa-house-chimney"></i>
                    TRANG CHỦ
                </router-link>
                <router-link class="text-sm font-semibold leading-6 text-gray-900 hover:text-teal-500"
                    :to="{ name: 'about-page' }">
                    <i class="fa-solid fa-info"></i>
                    GIỚI THIỆU
                </router-link>
                <router-link class="text-sm font-semibold leading-6 text-gray-900 hover:text-teal-500"
                    :to="{ name: 'contact-page' }">
                    <i class="fa-solid fa-newspaper"></i>
                    LIÊN HỆ
                </router-link>
            </div>
            <div v-show="authStore.user === null">
                <router-link class="text-sm font-semibold leading-6 text-gray-900 hover:text-teal-500"
                    :to="{ name: 'login-page' }">
                    ĐĂNG NHẬP
                    <i class="fa-solid fa-right-to-bracket"></i>
                </router-link>
                hay
                <router-link class="text-sm font-semibold leading-6 text-gray-900 hover:text-teal-500"
                    :to="{ name: 'register-page' }">
                    ĐĂNG KÝ
                    <i class="fa-solid fa-user-plus"></i>
                </router-link>
            </div>
            <div v-show="authStore.user?._id">
                <button id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover"
                    class=" flex items-center gap-2 border p-1 bg-white rounded-xl w-auto" type="button">
                    <img :src="authStore.user?.linkimg" class="w-[30px] rounded-[50%] object-cover" alt="">
                    <h1 class="text-[15px]">{{ authStore.user?.lastname }}</h1>
                </button>
                <div id="dropdownHover"
                    class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700">
                    <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
                        <li>
                            <router-link :to="{ name: 'profile-page' }"
                                class="w-full text-start block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                Thông tin cá nhân
                            </router-link>
                        </li>
                        <li v-if="authStore.user?.role === 0">
                            <router-link :to="{ name: 'user-manager' }"
                                class="w-full text-start block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                Quản lý người dùng</router-link>
                        </li>
                        <li v-if="authStore.user?.role === 0">
                            <router-link :to="{ name: 'product-manager' }"
                                class="w-full text-start block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                Quản lý sản phẩm
                            </router-link>
                        </li>
                        <li v-if="authStore.user?.role === 0">
                            <router-link :to="{ name: 'bill-manager' }"
                                class="w-full text-start block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                Quản lý hóa Đơn
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'cart-page' }"
                                class="w-full text-start block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                Giỏ hàng</router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'bills-page' }"
                                class="w-full text-start block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                Sản phẩm đã đặt
                            </router-link>
                        </li>
                        <li>
                            <button @click="btnLogOut"
                                class="w-full text-start block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Đăng
                                xuất</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<style scoped></style>