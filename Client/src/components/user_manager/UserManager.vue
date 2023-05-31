<script setup>
import moment from 'moment';
import { useUserStore } from '../../stores/user.store'
import { onMounted, reactive } from 'vue'
import { useToast } from 'vue-toast-notification'

const $toast = useToast()
const userStore = useUserStore()

const users = reactive([])

const findAllUsers = async () => {
    await userStore.getAllUsers()
    if (userStore.err) {
        $toast.error(userStore.err, { position: 'top-right' })
        return
    }
    userStore.result.data.forEach(element => {
        users.push(element)
    })
}

const reLoad = () => {
    users.splice(0, users.length)
    findAllUsers()
}

const deleteAll = async () => {
    let say = confirm('Bạn muốn xóa tất cả người dùng?')
    if (say) {
        await userStore.deleteAllUser()
        if (userStore.err) {
            $toast.error(userStore.err)
            return
        }
        reLoad()
        $toast.success(userStore.result.message, { position: 'top-right' })
    }
}

onMounted(() => {
    reLoad()
})
</script>
<template>
    <div>
        <div class="flex items-end w-[90%] justify-between mx-auto">
            <div class="text-xl">
                <h1>Tổng số tài khoản: {{ users.length }}</h1>
            </div>
            <div class="flex gap-5 items-center mt-5">
                <button @click="reLoad"
                    class="rounded-lg text-sm px-5 py-2.5 text-center bg-yellow-300 hover:bg-yellow-200 font-semibold">
                    <i class="fa-solid fa-rotate-right"></i>
                    Tải lại
                </button>
                <router-link :to="{ name: 'add-user' }"
                    class="rounded-lg text-sm px-5 py-2.5 text-center bg-green-400 hover:bg-green-300 text-slate-900 font-semibold">
                    <i class="fa-solid fa-plus"></i>
                    Thêm
                </router-link>
                <button @click="deleteAll"
                    class="rounded-lg text-sm px-5 py-2.5 text-center bg-red-600 hover:bg-red-500 text-slate-900 font-semibold">
                    <i class="fa-solid fa-trash-can"></i>
                    Xóa tất cả
                </button>
            </div>
        </div>
        <div class="w-[90%] flex flex-col mx-auto mt-5">
            <table class="table-auto border-au border border-slate-400">
                <thead>
                    <tr class="bg-green-100">
                        <th class="border border-slate-900 p-2">STT</th>
                        <th class="border border-slate-900 p-2">Ảnh đại diện</th>
                        <th class="border border-slate-900 p-2">Họ và tên</th>
                        <th class="border border-slate-900 p-2">Số điện thoại</th>
                        <th class="border border-slate-900 p-2">Địa chỉ</th>
                        <th class="border border-slate-900 p-2">Admin</th>
                        <th class="border border-slate-900 p-2">Ngày tạo</th>
                        <th class="border border-slate-900 p-2">Ngày sửa</th>
                        <th class="border border-slate-900 p-2">Sửa</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="users.length === 0">
                        <td colspan="9" class="border border-slate-900 p-2 text-center">Không có tài khoản nào...</td>
                    </tr>
                    <tr v-for="(user, i) in users" :key="user._id">
                        <td class="border border-slate-900 p-2 text-center w-[20px]">{{ i + 1 }}</td>
                        <td class="border border-slate-900 w-[60px] p-2">
                            <img class="w-[50px] rounded-[50%] object-cover" :src="user.linkimg" alt="">
                        </td>
                        <td class="border border-slate-900 p-2">{{ user.firstname + ' ' + user.lastname }}</td>
                        <td class="border border-slate-900 p-2">{{ user.numberphone }}</td>
                        <td class="border border-slate-900 p-2">{{ user.address }}</td>
                        <td class="border border-slate-900 p-2 text-center text-2xl text-blue-600 w-[50px]">
                            <i v-if="user.role === 0" class="fa-solid fa-check"></i>
                        </td>
                        <td class="border border-slate-900 p-2 w-[100px]">{{ moment(user.createdAt).format('lll') }}</td>
                        <td class="border border-slate-900 p-2 w-[100px]">{{ moment(user.updatedAt).format('lll') }}</td>
                        <td class="border border-slate-900 p-2 text-center w-[100px]">
                            <router-link :to="{ name: 'edit-user', params: { id: user._id } }"
                                class="rounded-lg text-sm px-5 py-2.5 text-center bg-cyan-600 hover:bg-teal-300 text-slate-900 hover:text-stone-100 font-semibold">
                                <i class="fa-solid fa-pen-to-square"></i>
                                Sửa
                            </router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>