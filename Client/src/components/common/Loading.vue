<script setup>
defineProps({
    message: String
})
</script>
<template>
    <div class="w-full flex items-center justify-center h-[500px] flex-col">
        <p class="text-2xl text-red-500 font-semibold" v-if="message">{{ message }}</p>
        <img src="/Loading_icon.gif" alt="">
    </div>
</template>