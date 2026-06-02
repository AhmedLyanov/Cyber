<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
      <div class="flex justify-center mb-6">
        <Logo />
      </div>

      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Logo } from '~/shared/ui'
</script>
