<script setup>
import { useAuthStore } from '../stores/auth.store'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification';

const authStore = useAuthStore()
const $toast = useToast();
const router = useRouter()

const user = reactive({
    numberphone: '',
    password: '',
})

const userErr = reactive({
    codeErrNum: 0,
    numberphone: '',
    codeErrPass: 0,
    password: '',
})

const submitLogin = async () => {
    if (!authStore.validateMobile(user.numberphone)) userErr.codeErrNum = 1
    else userErr.codeErrNum = 0

    if (user.password.length < 6) userErr.codeErrPass = 1
    else userErr.codeErrPass = 0

    if (!userErr.codeErrNum && !userErr.codeErrPass) {
        await authStore.login(user)
        if (authStore.err) {
            $toast.error(authStore.err, { position: 'top-right' })
            return
        }
        $toast.success(authStore.result.message, { position: 'top-right' })
        setTimeout(() => { router.push({ name: 'home-page' }) }, 400)
    }
}
</script>
<template>
    <section class="bg-slate-100">
        <div class="flex items-center justify-center px-6 py-8 bg-slate-100">
            <div class="w-full  shadow md:mt-0 sm:max-w-md xl:p-0 ">
                <div class="p-6 bg-white rounded-lg">
                    <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl text-center text-teal-500">
                        ĐĂNG NHẬP
                    </h1>
                    <form class="space-y-3" @submit.prevent="submitLogin">
                        <div>
                            <label for="sdt" class="block mb-2 text-sm font-medium text-gray-900">
                                Số điện thoại
                            </label>
                            <input type="text" name="sdt" id="sdt" v-model="user.numberphone" required
                                placeholder="0123456789"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  focus:outline-teal-500">
                            <span class="text-red-600 text-sm" v-if="userErr.codeErrNum">Số điện thoại không hợp lệ!</span>
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Mật khẩu
                            </label>
                            <input type="password" name="password" id="password" placeholder="••••••••"
                                v-model="user.password" required
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  focus:outline-teal-500">
                            <span class="text-red-600 text-sm" v-if="userErr.codeErrPass">Tối thiểu 6 ký tự!</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <a href="#" class="text-sm font-medium text-primary-600 hover:underline hover:text-red-600">
                                Quên mật khẩu?
                            </a>
                        </div>
                        <button type="submit"
                            class="w-full rounded-lg text-sm px-5 py-2.5 text-center bg-teal-500 hover:bg-teal-300 text-slate-900 hover:text-stone-100 font-semibold">
                            Đăng nhập
                        </button>
                        <p class="text-sm font-light text-gray-500">
                            Bạn chưa có tài khoản?
                            <router-link class="font-medium text-primary-600 hover:underline hover:text-red-600"
                                :to="{ name: 'register-page' }">
                                Đăng ký
                            </router-link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>