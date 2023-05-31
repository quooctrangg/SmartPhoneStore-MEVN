<script setup>
import { onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user.store'
import { useAuthStore } from '../../stores/auth.store'
import { useToast } from 'vue-toast-notification'

const $toast = useToast();
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const authStore = useAuthStore()

const data = reactive({})

const submitUpdate = async () => {
    await authStore.updateUser(route.params.id, data)
    if (authStore.err) {
        $toast.error(authStore.err, { position: 'top-right' })
        return
    }
    $toast.success(authStore.result.message, { position: 'top-right' })
    setTimeout(() => { router.push({ name: 'profile-page' }) }, 400)
}

const getUser = async id => {
    await userStore.findById(id)
    if (userStore.err) {
        $toast(userStore.err, { position: 'top-right' })
        return
    }
    let { firstname, lastname, address, linkimg } = userStore.result.data
    data.firstname = firstname
    data.lastname = lastname
    data.address = address
    data.linkimg = linkimg
}

onMounted(() => {
    getUser(route.params.id)
})
</script>
<template>
    <section class="bg-gray-5">
        <div class="mt-5 mx-auto flex justify-center">
            <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                <div class="p-4 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl text-center text-teal-500">
                        Cập nhật thông tin
                    </h1>
                    <form class="space-y-2" @submit.prevent="submitUpdate">
                        <div class="flex gap-2">
                            <div>
                                <label for="firstname" class="block mb-1 text-sm font-medium text-gray-900">
                                    Họ
                                </label>
                                <input type="text" name="firstname" id="firstname" v-model="data.firstname"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-teal-500"
                                    required maxlength="20" minlength="2">
                            </div>
                            <div>
                                <label for="lastname" class="block mb-1 text-sm font-medium text-gray-900">
                                    Tên
                                </label>
                                <input type="text" name="lastname" id="lastname" v-model="data.lastname"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-teal-500"
                                    required maxlength="30" minlength="1">
                            </div>
                        </div>
                        <div>
                            <label for="address" class="block mb-1 text-sm font-medium text-gray-900 ">
                                Địa chỉ
                            </label>
                            <input type="text" name="address" id="address" v-model="data.address" maxlength="100"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5  focus:outline-teal-500">
                        </div>
                        <div class="flex items-center gap-3">
                            <div class="flex-1">
                                <label for="linkimg" class="block mb-1 text-sm font-medium text-gray-900 ">
                                    Link ảnh đại diện
                                </label>
                                <input type="text" name="linkimg" id="linkimg" v-model="data.linkimg" maxlength="100"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5  focus:outline-teal-500">
                            </div>
                            <div class="">
                                <img class="w-[50px] rounded-[50%] object-cover" :src="data.linkimg">
                            </div>
                        </div>
                        <div class=" flex gap-5">
                            <button type="submit"
                                class="w-full rounded-lg text-sm px-5 py-2.5 text-center bg-teal-400 hover:bg-teal-300 text-slate-900 hover:text-stone-100 font-semibold">
                                Sửa
                            </button>
                            <router-link :to="{ name: 'profile-page' }"
                                class="w-full rounded-lg text-sm px-5 py-2.5 text-center bg-red-500 hover:bg-red-400 text-slate-900 hover:text-stone-100 font-semibold">
                                Hủy
                            </router-link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>