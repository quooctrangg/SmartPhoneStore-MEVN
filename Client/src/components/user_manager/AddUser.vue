<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user.store'
import { useAuthStore } from '../../stores/auth.store'
import { useToast } from 'vue-toast-notification'

const $toast = useToast();
const router = useRouter()
const userStore = useUserStore()
const { validateMobile } = useAuthStore()

const user = reactive({})

const userErr = reactive({
    firstname: false,
    lastname: false,
    numberphone: false,
    password: false,
})

const submitCreate = async () => {
    if (user.firstname.length === '' || user.firstname.length > 20) userErr.firstname = true
    else userErr.firstname = false

    if (user.lastname.length === '' || user.lastname.length > 20) userErr.lastname = true
    else userErr.lastname = false

    if (!validateMobile(user.numberphone)) userErr.numberphone = true
    else userErr.numberphone = false

    if (user.password.length < 6) userErr.password = true
    else userErr.password = false

    if (!userErr.firstname && !userErr.lastname && !userErr.numberphone && !userErr.password) {
        await userStore.createUser(user)
        if (userStore.err) {
            $toast.error(userStore.err, { position: 'top-right' })
            return
        }
        $toast.success(userStore.result.message, { position: 'top-right' })
        setTimeout(() => { router.push({ name: 'user-manager' }) }, 400)
    }
}
</script>
<template>
    <section class="bg-gray-5">
        <div class="mt-10 mx-auto flex justify-center">
            <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                <div class="p-4 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl text-center text-teal-500">
                        Thêm Tài Khoản
                    </h1>
                    <form class="space-y-2" @submit.prevent="submitCreate">
                        <div>
                            <label for="firstname" class="block mb-1 text-sm font-medium text-gray-900">
                                Họ
                            </label>
                            <input type="text" name="firstname" id="firstname" v-model="user.firstname"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-teal-500"
                                required>
                            <span class="text-red-600 text-sm" v-if="userErr.firstname">Họ không hợp lệ!</span>

                        </div>
                        <div>
                            <label for="lastname" class="block mb-1 text-sm font-medium text-gray-900">
                                Tên
                            </label>
                            <input type="text" name="lastname" id="lastname" v-model="user.lastname"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-teal-500"
                                required>
                            <span class="text-red-600 text-sm" v-if="userErr.lastname">Tên không hợp lệ!</span>
                        </div>
                        <div>
                            <label for="sdt" class="block mb-1 text-sm font-medium text-gray-900">
                                Số điện thoại
                            </label>
                            <input type="text" name="sdt" id="sdt" v-model="user.numberphone"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5  focus:outline-teal-500"
                                required>
                            <span class="text-red-600 text-sm" v-if="userErr.numberphone">Số điện thoại không hợp lệ!</span>
                        </div>
                        <div>
                            <label for="password" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Mật
                                khẩu</label>
                            <input type="text" name="password" id="password" v-model="user.password" required
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5  focus:outline-teal-500">
                            <span class="text-red-600 text-sm" v-if="userErr.password">Mật khẩu tối thiểu 6 chữ số!</span>

                        </div>
                        <div>
                            <label for="" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                Quản trị viên
                            </label>
                            <select v-model="user.role"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5  focus:outline-teal-500">
                                <option value="1">Không</option>
                                <option value="0">Có</option>
                            </select>
                        </div>
                        <div>
                            <label for="address" class="block mb-1 text-sm font-medium text-gray-900 ">
                                Địa chỉ
                            </label>
                            <input type="text" name="address" id="address" v-model="user.address" maxlength="100"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5  focus:outline-teal-500">
                        </div>
                        <div class="flex items-center gap-3">
                            <div class="flex-1">
                                <label for="linkimg" class="block mb-1 text-sm font-medium text-gray-900 ">
                                    Link ảnh đại diện
                                </label>
                                <input type="text" name="linkimg" id="linkimg" v-model="user.linkimg" maxlength="100"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5  focus:outline-teal-500">
                            </div>
                            <div v-if="user.linkimg !== ''">
                                <img class="w-[50px]" :src="user.linkimg">
                            </div>
                        </div>
                        <div class="flex gap-5">
                            <router-link :to="{ name: 'user-manager' }"
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