<template>
    <Header />
    <main>
        <slot />
    </main>
    <Footer />
</template>

<script setup lang="ts">
import Header from "~/widgets/header/Header.vue"
import Footer from "~/widgets/footer/Footer.vue"
</script>
