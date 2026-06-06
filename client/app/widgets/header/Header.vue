<template>
  <header class="flex items-center gap-16 px-40 py-4 border-b border-header-border">
        <Logo />
        <Input />
        <Navigation />
  </header>
</template>

<script setup lang="ts">
import { Logo, Input, Navigation } from '~/shared/ui';
</script>