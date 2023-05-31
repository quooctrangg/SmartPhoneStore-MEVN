<script setup>
import BillDetail from '../common/BillDetail.vue'

import { useBillStore } from '../../stores/bill.store'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import { onMounted, ref } from 'vue'

const billStore = useBillStore()
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

const reload = () => {
    getById(route.params.id)
}

onMounted(() => {
    getById(route.params.id)
})
</script>
<template>
    <BillDetail :bill="bill" />
    <div class="w-full flex justify-center mt-5">
        <div class="flex gap-5 w-[70%] justify-end">
            <router-link :to="{ name: 'bills-page' }"
                class="rounded-lg text-sm px-5 py-2.5 text-center bg-yellow-300 hover:bg-yellow-200 text-slate-900 hover:text-stone-100 font-semibold">
                <i class="fa-solid fa-arrow-left-long"></i>
                Trở về
            </router-link>
            <button type="submit" @click="reload"
                class="rounded-lg text-sm px-5 py-2.5 text-center bg-red-500 hover:bg-red-300 text-slate-900 hover:text-stone-100 font-semibold">
                <i class="fa-solid fa-arrows-rotate"></i>
                Làm mới
            </button>
        </div>
    </div>
</template>