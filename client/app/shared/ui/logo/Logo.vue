<script setup lang="ts">
import logo from './logo.svg';
import { routes } from '~/shared/constants'
</script>

<template>
  <NuxtLink :to="routes.home">
    <NuxtImg :src="logo" alt="Cyber" class="h-5 auto"/>
  </NuxtLink>
</template>