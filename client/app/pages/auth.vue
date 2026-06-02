<template>
  <div class="">
    <Typography variant="h2" class="text-center mb-2">Sign in</Typography>
    <Typography variant="bodyLg" class="text-center text-gray mb-6">Sign in to access your account</Typography>

    <form @submit.prevent="onSubmit" class="space-y-4">
      <div>
        <label class="block text-sm text-gray-700 mb-1">Email</label>
        <input v-model="email" type="email" required class="mt-1 w-full border rounded px-3 py-2" />
      </div>

      <div>
        <label class="block text-sm text-gray-700 mb-1">Password</label>
        <input v-model="password" type="password" required class="mt-1 w-full border rounded px-3 py-2" />
      </div>

      <div class="flex items-center justify-between">
        <Button type="submit">Sign in</Button>
        <NuxtLink to="/register" class="text-sm text-blue-600">Register</NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Typography, Button } from '~/shared/ui'

definePageMeta({ layout: 'auth' })

const email = ref('')
const password = ref('')
const router = useRouter()

function onSubmit() {
  // TODO: replace with real authentication logic
  console.log('Sign in', email.value, password.value)
  router.push('/')
}
</script>