<script setup>
import BillDetail from '../common/BillDetail.vue'

import { useBillStore } from '../../stores/bill.store'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import { onMounted, ref } from 'vue'
import { useAuthStore } from '../../stores/auth.store'

const billStore = useBillStore()
const authStore = useAuthStore()
const route = useRoute()
const $toast = useToast()

const bill = ref(null)

const getById = async id => {
    await billStore.findById(id)
    if (billStore.err) {
        $toast.error(billStore.err)
        return
    }
    bill.value = billStore.result.data
}

const cancel = async () => {
    if (confirm('Bạn có chắn chắc hủy?')) {
        let data = {
            idAdmin: authStore.user._id,
            codestatus: -1
        }
        await billStore.updateBill(route.params.id, data)
        if (billStore.err) {
            $toast.error(billStore.err)
            return
        }
        getById(route.params.id)
        $toast.success(billStore.result.message)
    }
}

const submit = async () => {
    if (confirm('Bạn có chắn chắc duyệt?')) {
        let data = {
            idAdmin: authStore.user._id,
            codestatus: 1
        }
        await billStore.updateBill(route.params.id, data)
        if (billStore.err) {
            $toast.error(billStore.err)
            return
        }
        getById(route.params.id)
        $toast.success(billStore.result.message)
    }
}

onMounted(() => {
    getById(route.params.id)
})
</script>
<template>
    <BillDetail :bill="bill" />
    <div class="w-full flex justify-center mt-5">
        <div class="flex gap-5 w-[70%] justify-end">
            <router-link :to="{ name: 'bill-manager' }"
                class="rounded-lg text-sm px-5 py-2.5 text-center bg-yellow-300 hover:bg-yellow-200 text-slate-900 hover:text-stone-100 font-semibold">
                <i class="fa-solid fa-arrow-left-long"></i>
                Trở về
            </router-link>
            <button type="submit" @click="cancel" v-if="bill?.codestatus === 0"
                class="rounded-lg text-sm px-5 py-2.5 text-center bg-red-500 hover:bg-red-300 text-slate-900 hover:text-stone-100 font-semibold">
                <i class="fa-solid fa-xmark"></i>
                Hủy
            </button>
            <button type="submit" @click="submit" v-if="bill?.codestatus === 0"
                class="rounded-lg text-sm px-5 py-2.5 text-center bg-green-500 hover:bg-green-300 text-slate-900 hover:text-stone-100 font-semibold">
                <i class="fa-solid fa-plus"></i>
                Duyệt
            </button>
        </div>
    </div>
</template>