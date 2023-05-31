<script setup>
import { useBillStore } from '../stores/bill.store'
import { useAuthStore } from '../stores/auth.store'
import { useToast } from 'vue-toast-notification'
import { onMounted, ref } from 'vue'
import moment from 'moment'

const billStore = useBillStore()
const authStore = useAuthStore()
const $toast = useToast()

const bills = ref([])

const getBtIdUser = async idUser => {
    await billStore.findByIdUser(idUser)
    if (billStore.err) {
        $toast.error(billStore.err)
        return
    }
    bills.value = billStore.result.data
}

onMounted(() => {
    getBtIdUser(authStore.user._id)
})
</script>
<template>
    <h1 class="text-3xl font-bold leading-tight tracking-tight text-center text-teal-500 pb-5">
        Sản phẩm đã đặt
    </h1>
    <div class="w-[90%] flex flex-col mx-auto mt-5">
        <table class="table-auto border-au border border-slate-400 mt-2">
            <thead>
                <tr>
                    <th class="border border-slate-900 p-2">STT</th>
                    <th class="border border-slate-900 p-2">Mã HĐ</th>
                    <th class="border border-slate-900 p-2">Số lượng sản phẩm</th>
                    <th class="border border-slate-900 p-2">Tổng giá trị</th>
                    <th class="border border-slate-900 p-2">Trạng thái</th>
                    <th class="border border-slate-900 p-2">Ngày đặt</th>
                    <th class="border border-slate-900 p-2">Ngày duyệt</th>
                    <th class="border border-slate-900 p-2">Hoạt động</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="bills.length" v-for="(bill, index) in bills" :key="bill._id">
                    <td class="border border-slate-900 p-1 text-center">{{ index + 1 }}</td>
                    <td class="border border-slate-900 p-1 text-center">{{ bill._id }}</td>
                    <td class="border border-slate-900 p-1 text-center">{{ bill.sumquantity }}</td>
                    <td class="border border-slate-900 p-1 text-center text-red-500">
                        {{ Number(bill.sumprice).toLocaleString('de-DE', { style: 'currency', currency: 'VND' }) }}
                    </td>
                    <td class="border border-slate-900 p-1 text-center">
                        <p v-if="bill.codestatus == 0" class="text-lg text-yellow-300">Đang chờ</p>
                        <p v-if="bill.codestatus == 1" class="text-lg text-green-500">Đã duyệt</p>
                        <p v-if="bill.codestatus == -1" class="text-lg text-red-500">Đã hủy</p>
                    </td>
                    <td class="border border-slate-900 p-1 text-center">{{ moment(bill.createdAt).format('lll') }}</td>
                    <td class="border border-slate-900 p-1 text-center">
                        {{ bill.approval ? moment(bill.approval).format('lll') : '' }}
                    </td>
                    <td class="border border-slate-900 p-1 text-center underline text-green-400 hover:text-green-300">
                        <router-link
                            :to="{ name: 'bill-list', params: { id: bill._id }, query: { idUser: bill.idUser, idAdmin: bill?.idAdmin } }">
                            Chi tiết
                        </router-link>
                    </td>
                </tr>
                <tr v-else>
                    <td class="border border-slate-900 p-1 text-center text-xl" colspan="8">Trống...</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>