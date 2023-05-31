<script setup>
import { useBillStore } from '../../stores/bill.store'
import { useToast } from 'vue-toast-notification'
import { onMounted, ref } from 'vue'
import moment from 'moment'

const billStore = useBillStore()
const $toast = useToast()

const bills = ref([])

const getAllBills = async () => {
    await billStore.findAllBills()
    if (billStore.err) {
        $toast.error(billStore.err)
        return
    }
    bills.value = billStore.result.data
}

const getByCode = async (codestatus) => {
    await billStore.findByCode(codestatus)
    if (billStore.err) {
        $toast.error(billStore.err)
        return
    }
    bills.value = billStore.result.data
}

onMounted(() => {
    getAllBills()
})
</script>
<template>
    <h1 class="text-4xl font-bold text-teal-500 text-center mt-9">Quản Lý Hóa Đơn</h1>
    <div class="w-[90%] flex flex-col mx-auto mt-5">
        <h2 class="tex-xl flex gap-1 items-center">Tìm kiếm theo:
            <button type="submit" @click="getAllBills()"
                class="rounded-lg text-sm px-5 py-2.5 text-center bg-slate-300 hover:bg-slate-200 text-slate-900 hover:text-stone-100 font-semibold">
                Mặc Định
            </button>
            <button type="submit" @click="getByCode(0)"
                class="rounded-lg text-sm px-5 py-2.5 text-center bg-yellow-300 hover:bg-yellow-200 text-slate-900 hover:text-stone-100 font-semibold">
                Đang chờ
            </button>
            <button type="submit" @click="getByCode(1)"
                class="rounded-lg text-sm px-5 py-2.5 text-center bg-green-500 hover:bg-green-300 text-slate-900 hover:text-stone-100 font-semibold">
                Đã duyệt
            </button>
            <button type="submit" @click="getByCode(-1)"
                class="rounded-lg text-sm px-5 py-2.5 text-center bg-red-500 hover:bg-red-300 text-slate-900 hover:text-stone-100 font-semibold">
                Đã hủy
            </button>
        </h2>
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
                            :to="{ name: 'bill-approval', params: { id: bill._id }, query: { idUser: bill.idUser, idAdmin: bill?.idAdmin } }">
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