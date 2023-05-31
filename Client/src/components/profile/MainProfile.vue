<script setup>
import { useAuthStore } from '../../stores/auth.store'
import { useUserStore } from '../../stores/user.store'
import { onMounted } from 'vue'
import { useToast } from 'vue-toast-notification'
import Loading from '../common/Loading.vue'

const $toast = useToast()
const authStore = useAuthStore()
const userStore = useUserStore()

const getUser = async id => {
    await userStore.findById(id)
    if (userStore.err) {
        $toast.error(userStore.err, { position: 'top-right' })
        return
    }
    authStore.user = userStore.result.data
}

const reLoad = () => {
    getUser(authStore.user._id)
}

onMounted(() => {
    getUser(authStore.user._id)
})
</script>
<template>
    <h1 class="text-3xl font-bold text-teal-500 text-center ">Thông tin tài khoản</h1>
    <Loading v-if="userStore.err" :message="userStore.err" />
    <div v-else>
        <div class="flex w-full items-center justify-center gap-5 m-3">
            <div class="">
                <img class="rounded-[50%] object-cover w-[200px]" :src="authStore.user.linkimg" alt="">
            </div>
            <div class="text-xl">
                <h2>Họ và tên: <span>{{ authStore.user.firstname + ' ' + authStore.user.lastname }}</span></h2>
                <h2>Số điện thoại: <span>{{ authStore.user.numberphone }}</span></h2>
                <h2>Địa chỉ: <span>{{ authStore.user.address }}</span></h2>
            </div>
        </div>
        <div class="w-full flex items-center justify-center gap-8">
            <button @click="reLoad"
                class="rounded-lg text-sm px-5 py-2.5 text-center bg-yellow-300 hover:bg-yellow-200 text-slate-900 hover:text-stone-100 font-semibold">
                Làm mới
            </button>
            <router-link :to="{ name: 'editProfile-page', params: { id: authStore.user._id } }"
                class="rounded-lg text-sm px-5 py-2.5 text-center bg-teal-500 hover:bg-teal-300 text-slate-900 hover:text-stone-100 font-semibold">
                Sửa thông tin
            </router-link>
        </div>
    </div>
</template>