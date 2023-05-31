<script setup>
import { useToast } from 'vue-toast-notification'

const $toast = useToast()

const btnSubmit = () => {
    $toast.warning('Tính năng đang phát triển!')
}
</script>
<template>
    <div class="flex w-4/5 ml-auto mr-auto">
        <div class="p-5 w-full">
            <iframe width="100%" height="100%" frameborder="0" aria-hidden="false" tabindex="0"
                style="border: 0px; height: 500px; width: 100%;"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7000.40411969514!2d105.76939959666414!3d10.029720096211575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0895a51d60719%3A0x9d76b0035f6d53d0!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBD4bqnbiBUaMah!5e0!3m2!1svi!2s!4v1664725328909!5m2!1svi!2s"
                loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div class="w-full p-7">
            <div class="flex text-2xl justify-center gap-2 items-center font-bold  text-emerald-600">
                <i class="fa-solid fa-envelope"></i>
                <h2>Để lại lời nhắn cho chúng tôi</h2>
            </div>
            <form @submit.prevent="btnSubmit">
                <div class="mt-2">
                    <label for="name" class="block font-medium text-gray-900 text-xl">Họ và tên: </label>
                    <input type="text" name="name" id="name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Nguyen Van A">
                </div>
                <div class="mt-2">
                    <label for="email" class="block font-medium text-gray-900 text-xl">Email: </label>
                    <input type="email" name="email" id="email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="vana@gmail.com">
                </div>
                <div class="mt-2">
                    <label for="sdt" class="block font-medium text-gray-900 text-xl">Số điện thoại:</label>
                    <input type="text" name="sdt" id="sdt"
                        class="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="0123456789">
                </div>
                <div class="mt-2">
                    <label for="message" class="block font-medium text-gray-900 dark:text-white text-xl">Viết
                        lời nhắn: </label>
                    <textarea id="message" rows="4"
                        class="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
                </div>
                <button type="submit"
                    class="w-full bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-xl px-5 py-2.5 text-center bg-emerald-600 hover:bg-emerald-400 hover:text-stone-100 mt-4">
                    Gửi
                </button>
            </form>
        </div>
    </div>
</template>