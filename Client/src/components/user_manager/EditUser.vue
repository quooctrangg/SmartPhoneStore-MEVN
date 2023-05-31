<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, reactive, ref } from 'vue'
import { useUserStore } from '../../stores/user.store'
import { useToast } from 'vue-toast-notification'

const $toast = useToast()
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const id = route.params.id
const user = reactive({})
const phone = ref('')

const btnDelete = async id => {
    let say = confirm('Bạn có chắc chắn muốn xóa?')
    if (say) {
        await userStore.deleteUser(id)
        if (userStore.err) {
            $toast.error(userStore.err, { position: 'top-right' })
            return
        }
        $toast.success(userStore.result.message, { position: 'top-right' })
        setTimeout(() => { router.push({ name: 'user-manager' }) }, 400)
    }
}

const submitUpdate = async () => {
    await userStore.updateUser(route.params.id, user)
    if (userStore.err) {
        $toast.error(userStore.err, { position: 'top-right' })
        return
    }
    $toast.success(userStore.result.message, { position: 'top-right' })
    setTimeout(() => { router.push({ name: 'user-manager' }) }, 400)
}

const getUser = async id => {
    await userStore.findById(id)
    if (userStore.err) {
        $toast.error(userStore.err, { position: 'top-right' })
        return
    }
    let { firstname, lastname, address, linkimg, role, numberphone } = userStore.result.data
    user.firstname = firstname
    user.lastname = lastname
    user.address = address
    user.linkimg = linkimg
    user.role = role
    phone.value = numberphone
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
                    <form class="space-y-2" @submit.prevent="">
                        <div>
                            <h1 for="sdt" class="text-2xl text-center">
                                Số điện thoại: {{ phone }}
                            </h1>
                        </div>
                        <div class="flex gap-2">
                            <div>
                                <label for="firstname" class="block mb-1 text-sm font-medium text-gray-900">
                                    Họ
                                </label>
                                <input type="text" name="firstname" id="firstname" v-model="user.firstname"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-teal-500"
                                    required>
                            </div>
                            <div>
                                <label for="lastname" class="block mb-1 text-sm font-medium text-gray-900">
                                    Tên
                                </label>
                                <input type="text" name="lastname" id="lastname" v-model="user.lastname"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-teal-500"
                                    required>
                            </div>
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
                            <div class="">
                                <img class="w-[50px] rounded-[50%] object-cover" :src="user.linkimg">
                            </div>
                        </div>
                        <div class=" flex gap-5">
                            <button @click="submitUpdate"
                                class="w-full rounded-lg text-sm px-5 py-2.5 text-center bg-teal-400 hover:bg-teal-300 text-slate-900 hover:text-stone-100 font-semibold">
                                Sửa
                            </button>
                            <button @click="btnDelete(id)"
                                class="w-full rounded-lg text-sm px-5 py-2.5 text-center bg-red-500 hover:bg-red-400 text-slate-900 hover:text-stone-100 font-semibold">
                                <i class="fa-solid fa-trash"></i>
                                Xóa
                            </button>
                            <router-link :to="{ name: 'user-manager' }"
                                class="w-full rounded-lg text-sm px-5 py-2.5 text-center bg-yellow-300 hover:bg-yellow-200 text-slate-900 hover:text-stone-100 font-semibold">
                                Hủy
                            </router-link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>