<template>
  <LoginForm />
</template>

<script setup lang="ts">
import LoginForm from "~/features/auth/ui/login-form.vue"

definePageMeta({ layout: 'auth' })
</script>