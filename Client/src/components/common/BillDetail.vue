<script setup>
import moment from 'moment'
import { useUserStore } from '../../stores/user.store'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps(['bill'])

const userStore = useUserStore()
const route = useRoute()

const user = ref(null)
const admin = ref(null)

const findByUser = async id => {
    await userStore.findById(id)
    if (userStore.err) {
        return
    }
    user.value = userStore.result.data
}

const findByAdmin = async id => {
    if (id) {
        await userStore.findById(id)
        if (userStore.err) {
            return
        }
        admin.value = userStore.result.data
    }
}

onMounted(() => {
    findByAdmin(route.query?.idAdmin)
    findByUser(route.query.idUser)
})
</script>
<template>
    <h1 class="text-4xl font-bold text-teal-500 text-center mt-9">Chi tiết hóa đơn</h1>
    <section class="w-full flex justify-center mt-5 flex-col items-center gap-5">
        <div class="w-[70%] flex justify-between">
            <div>
                <div class="text-lg">Mã hóa đơn: {{ props.bill?._id }}</div>
                <div class="text-lg">Người đặt: {{ user?.firstname + ' ' + user?.lastname }}</div>
                <div class="text-lg">Số điện thoại: {{ user?.numberphone }}</div>
                <div class="text-lg">Địa chỉ: {{ user?.address }}</div>
                <div class="text-lg">Ngày đặt: {{ moment(bill?.createdAt).format('lll') }} </div>
            </div>
            <div>
                <div class="text-lg flex gap-1">Người duyệt:
                    <p v-if="admin">
                        {{ admin?.firstname + ' ' + admin?.lastname }}
                    </p>
                </div>
                <div class="text-lg flex gap-1">Giá trị:
                    <p class="text-red-500">
                        {{ Number(bill?.sumprice).toLocaleString('de-DE', { style: 'currency', currency: 'VND' }) }}
                    </p>
                </div>
                <div class="text-lg">Số lượng: {{ props.bill?.sumquantity }} </div>
                <div class="text-lg flex gap-1">Trạng thái:
                    <p v-if="props.bill?.codestatus == 1" class="text-lg text-green-500">Đã duyệt</p>
                    <p v-if="props.bill?.codestatus == 0" class="text-lg text-yellow-300">Đang chờ</p>
                    <p v-if="props.bill?.codestatus == -1" class="text-lg text-red-500">Đã hủy</p>
                </div>
                <div class="text-lg">Ngày duyệt:
                    {{ bill?.approval ? moment(bill?.approval).format('lll') : '' }}
                </div>
            </div>
        </div>
        <div class="w-[70%] flex justify-between">
            <table class="table-auto border-au border border-slate-400 w-full text-black">
                <thead>
                    <tr class="bg-teal-300">
                        <th class="border border-slate-900 p-2 text-xl">STT</th>
                        <th class="border border-slate-900 p-2 text-xl">Mã</th>
                        <th class="border border-slate-900 p-2 text-xl">Tên sản phẩm</th>
                        <th class="border border-slate-900 p-2 text-xl">Đơn giá</th>
                        <th class="border border-slate-900 p-2 text-xl">Số lượng</th>
                        <th class="border border-slate-900 p-2 text-xl">Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="props.bill?.products" v-for="(product, index) of props.bill.products" :key="product._id">
                        <td class="border border-slate-900 p-1 text-center text-xl">{{ index + 1 }}</td>
                        <td
                            class="border border-slate-900 p-1 text-center text-xl text-teal-500 hover:text-teal-300 underline">
                            <router-link :to="{ name: 'product-page', params: { id: product.id } }">
                                {{ product.id }}
                            </router-link>
                        </td>
                        <td class="border border-slate-900 p-1 text-xl">{{ product.name }}</td>
                        <td class="border border-slate-900 p-1 text-center text-xl">
                            {{ Number(product.price).toLocaleString('de-DE', { style: 'currency', currency: 'VND' }) }}
                        </td>
                        <td class="border border-slate-900 p-1 text-center">
                            {{ product.quantity }}
                        </td>
                        <td class="border border-slate-900 p-1 text-center text-xl">
                            {{ Number(product.price * product.quantity).toLocaleString('de-DE', {
                                style: 'currency', currency:
                                    'VND'
                            }) }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>