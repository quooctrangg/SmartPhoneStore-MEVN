<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'
import { useToast } from 'vue-toast-notification'

const $toast = useToast();
const router = useRouter()
const authStore = useAuthStore()

const user = reactive({
    firstname: '',
    lastname: '',
    numberphone: '',
    password: '',
    address: '',
    linkimg: ''
})

const userErr = reactive({
    firstname: false,
    lastname: false,
    numberphone: false,
    password: false,
    confirmPassword: false
})

const confirmPassword = ref('')
const checkAcceptance = ref(false)

const submitRegister = async () => {
    if (user.firstname.length === '' || user.firstname.length > 20) userErr.firstname = true
    else userErr.firstname = false

    if (user.lastname.length === '' || user.lastname.length > 20) userErr.lastname = true
    else userErr.lastname = false

    if (!authStore.validateMobile(user.numberphone)) userErr.numberphone = true
    else userErr.numberphone = false

    if (user.password.length < 6) userErr.password = true
    else userErr.password = false

    if (confirmPassword.value !== user.password) userErr.confirmPassword = true
    else userErr.confirmPassword = false

    if (!userErr.firstname && !userErr.lastname && !userErr.numberphone && !userErr.password && !userErr.confirmPassword) {
        await authStore.register(user)
        if (authStore.err) {
            $toast.error(authStore.err, { position: 'top-right' })
            return
        }
        $toast.success(authStore.result.message, { position: 'top-right' })
        setTimeout(() => { router.push({ name: 'login-page' }) }, 400)
    }
}
</script>
<template>
    <section class="bg-gray-5">
        <div class="mt-10 mx-auto flex justify-center">
            <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                <div class="p-4 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl text-center text-teal-500">
                        ĐĂNG KÝ
                    </h1>
                    <form class="space-y-2" @submit.prevent="submitRegister">
                        <div class="flex gap-2">
                            <div>
                                <label for="firstname" class="block mb-1 text-sm font-medium text-gray-900">
                                    Họ
                                </label>
                                <input type="text" name="firstname" id="firstname" v-model="user.firstname"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-teal-500"
                                    placeholder="Nguyễn" required>
                                <span class="text-red-600 text-sm" v-if="userErr.firstname">Họ không hợp lệ!</span>
                            </div>
                            <div>
                                <label for="lastname" class="block mb-1 text-sm font-medium text-gray-900">
                                    Tên
                                </label>
                                <input type="text" name="lastname" id="lastname" v-model="user.lastname"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-teal-500"
                                    placeholder="Văn A" required>
                                <span class="text-red-600 text-sm" v-if="userErr.lastname">Tên không hợp lệ!</span>
                            </div>
                        </div>
                        <div>
                            <label for="sdt" class="block mb-1 text-sm font-medium text-gray-900">
                                Số điện thoại
                            </label>
                            <input type="text" name="sdt" id="sdt" v-model="user.numberphone"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5  focus:outline-teal-500"
                                placeholder="0123456789" required>
                            <span class="text-red-600 text-sm" v-if="userErr.numberphone">Số điện thoại không hợp lệ!</span>
                        </div>
                        <div>
                            <label for="password" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Mật
                                khẩu</label>
                            <input type="password" name="password" id="password" placeholder="••••••••"
                                v-model="user.password" required
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5  focus:outline-teal-500">
                            <span class="text-red-600 text-sm" v-if="userErr.password">Mật khẩu phải từ 6 ký tự trở
                                lên!</span>
                        </div>
                        <div>
                            <label for="confirm-password" class="block mb-1 text-sm font-medium text-gray-900">
                                Nhập lại mật khẩu
                            </label>
                            <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••"
                                v-model="confirmPassword" required
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5  focus:outline-teal-500">
                            <span class="text-red-600 text-sm" v-if="userErr.confirmPassword">Không khớp mật khẩu!</span>
                        </div>
                        <div>
                            <label for="address" class="block mb-1 text-sm font-medium text-gray-900 ">
                                Địa chỉ
                            </label>
                            <input type="text" name="address" id="address" v-model="user.address" maxlength="100"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5  focus:outline-teal-500"
                                placeholder="Ninh Kiều, Cần Thơ">
                        </div>
                        <div class="flex items-center gap-3">
                            <div class="flex-1">
                                <label for="linkimg" class="block mb-1 text-sm font-medium text-gray-900 ">
                                    Link ảnh đại diện
                                </label>
                                <input type="text" name="linkimg" id="linkimg" v-model="user.linkimg" maxlength="100"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5  focus:outline-teal-500"
                                    placeholder="https://cdn-icons-png.flaticon.com/512/219/219988.png">
                            </div>
                            <div v-if="user.linkimg !== ''">
                                <img class="w-[50px]" :src="user.linkimg">
                            </div>
                        </div>
                        <div class="flex items-start">
                            <div class="flex items-center h-5">
                                <input id="terms" aria-describedby="terms" type="checkbox" v-model="checkAcceptance"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            </div>
                            <div class="ml-3 text-sm">
                                <label for="terms" class="font-light text-emerald-600">Tôi chấp nhận các
                                    <router-link class="font-medium hover:underline hover:text-red-600"
                                        :to="{ name: 'about-page' }">
                                        Điều khoản và điều kiện</router-link>
                                </label>
                            </div>
                        </div>
                        <button type="submit" :disabled="!checkAcceptance"
                            class="w-full rounded-lg text-sm px-5 py-2.5 text-center bg-teal-500 hover:bg-teal-300 text-slate-900 hover:text-stone-100 font-semibold">
                            Tạo tài khoản
                        </button>
                        <p class="text-sm font-light text-gray-500">
                            Đã có tài khoản?
                            <router-link class="font-medium text-primary-600 hover:underline hover:text-red-600"
                                :to="{ name: 'login-page' }">
                                Đăng nhập tại đây
                            </router-link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>