<template>
    <Header />
    <main>
        <slot />
    </main>
    <Footer />
</template>

<script setup lang="ts">
import Header from "~/widgets/header/header.vue"
import Footer from "~/widgets/footer/footer.vue"
</script>
