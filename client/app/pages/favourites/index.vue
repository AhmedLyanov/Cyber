<template>
  <Favourites />
</template>

<script setup lang="ts">
import Favourites from "~/widgets/favourites/favourites.vue";

definePageMeta({
  middleware: "auth",
});
</script>