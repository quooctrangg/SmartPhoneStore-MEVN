<script setup>
import Header from './components/common/Header.vue'
import Footer from './components/common/Footer.vue'
</script>
<template>
  <Header />
  <div class="min-h-[700px]">
    <router-view />
  </div>
  <Footer />
</template>
